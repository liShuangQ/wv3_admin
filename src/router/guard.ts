import {RouteLocationNormalized, Router, RouteRecordRaw} from "vue-router";
import user from "@/store/user";
import {toRaw} from "vue";
import {store} from "@/utils";
import {afterRouter} from "@/router/config/fifter";

class Guard {
    private userStore

    constructor(private router: Router) {
        this.userStore = user()
    }

    public run(): void {
        this.router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
            if (to.meta.auth && !this.getToken()) {
                return {name: "login"};
            }
            if (to.meta.guest && this.getToken()) {
                return from;
            }
            // 获取用户信息 （登陆和获取接口分开）
            if (this.getToken() && !this.userStore.info) {
                // 设置用户信息 菜单等设置在pinia中进行
                await this.userStore.getUserInfo(this.getToken())
                if (process.env.AFTER_MENU === 'true') {
                    // 后台权限菜单 （适应变换的用户信息所以any）
                    afterRouter((this.userStore.info as any).menu).forEach((e: RouteRecordRaw): void => {
                        this.router.removeRoute(e.name as string)
                    })
                }
            }
        });
    }

    // 获取token
    private getToken() {
        return store.token();
    }
}

export default (router: Router): void => {
    new Guard(router).run();
};
