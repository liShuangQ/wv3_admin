import {defineStore} from "pinia";
import menuData, {PagesMenu} from '@/router/menu'

export default defineStore("menu", {
    state: (): {
        menu: PagesMenu[] | null
    } => {
        return {
            menu: null,
        };
    },
    actions: {
        setMenu(data: PagesMenu[]) {
            this.menu = data;
        },
        getMenu() {
            return this.menu
        },
    },
});
