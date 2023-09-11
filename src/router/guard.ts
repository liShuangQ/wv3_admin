import {Router, RouteRecordRaw} from "vue-router";
import user from "@/store/user";
import {toRaw} from "vue";
import {store} from "@/utils";
import {afterRouter, beforeRouter} from "@/router/config/fifter";

class Guard {
    private userStore

    constructor(private router: Router) {
        this.userStore = user()
    }

    public run() {
        // beforeRouter().forEach(e=>{
        //     this.router.addRoute(e)
        // })
        this.router.beforeEach(async (to, from) => {
            if (to.meta.auth && !this.getToken()) {
                return {name: "login"};
            }
            if (to.meta.guest && this.getToken()) {
                return from;
            }
            // 获取用户信息 （登陆和获取接口分开）
            if (this.getToken() && !this.userStore.info) {
                // 设置用户信息
                await this.userStore.getUserInfo(this.getToken())
                // 后台权限菜单
                afterRouter((this.userStore.info as any).menu).forEach((e:RouteRecordRaw)=>{
                    this.router.removeRoute(e.name as string)
                })
            }
        });
    }

    // 获取token
    private getToken() {
        return store.token();
    }
}

export default (router: Router) => {
    new Guard(router).run();
};
