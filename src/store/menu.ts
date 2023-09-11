import {defineStore} from "pinia";
import menuData from '@/router/menu/pages'
import user from "@/store/user";

export default defineStore("menu", {
    state: (): { menu: object | null } => {
        return {
            menu: null,
        };
    },
    actions: {
        setMenu(data: any) {
            this.menu = data;
        },
        getMenu() {
            return this.menu
        },
    },
});
