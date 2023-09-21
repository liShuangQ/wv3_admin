import {defineStore} from "pinia";
import {store} from "@/utils";
import router from "@/router";
import menuData, {PagesMenu} from "@/router/menu";
import menu from "@/store/menu";

export default defineStore("user", {
    state: (): { info: object | null } => {
        return {
            info: null,
        };
    },
    actions: {
        //设置用户信息
        setUserInfo(data: object) {
            this.info = data;
        },
        //清除用户信息
        clearUserInfo() {
            this.info = null;
        },
        //登录
        async userLogin(userData: object) {
            console.log(userData, '登录')
            let token = 'tokentokentokentokentokentokentoken'
            store.set(process.env.TOKEN_KEY as string, {
                expire: 20,
                token
            });
            await router.push({path: '/'});
        },
        //获取用户信息
        async getUserInfo(token: string) {
            console.log('获取用户信息')
            const res = {
                name: 'xxx',
                age: '18',
                menu: [
                    {
                        path: '/pages/home',
                        faPath: [],
                        title: '主页',
                        icon: 'HomeFilled',
                    },
                    {
                        path: '1',
                        faPath: [],
                        title: '演示',
                        icon: 'Menu',
                        children: [
                            {
                                title: '试例',
                                path: '/pages/demo',
                                faPath: ['1']
                            }
                        ]
                    },
                ]
            }
            if (process.env.AFTER_MENU === 'true') {
                menu().setMenu(res.menu as PagesMenu[])
            } else {
                menu().setMenu(menuData as PagesMenu[])
            }
            this.setUserInfo(res)
        },
        //前端登出
        userLogOut() {
            this.info = null;
            localStorage.removeItem(process.env.TOKEN_KEY as string);
            router.push({name: "login"});
        },

    },
});
