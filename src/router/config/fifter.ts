import {RouteRecordRaw} from "vue-router";
import {view_Routes} from "@/router";
import {PagesMenu} from "@/router/menu";
import {cloneDeep} from "lodash";

export function beforeRouter(): RouteRecordRaw[] {
    return view_Routes
}

export function afterRouter(menu: any): RouteRecordRaw[] {
    const flatMenu: PagesMenu[] = []
    function deep(d: PagesMenu[]) {
        d.forEach(ele => {
            if (!ele.children || ele.children.length === 0) {
                flatMenu.push(ele);
                return;
            } else {
                ele.children && deep(ele.children);
            }
        })
    }
    cloneDeep(menu).forEach((e:PagesMenu) => {
        if (!e.children || e.children.length === 0) {
            flatMenu.push(e)
        } else {
            deep(e.children)
        }
    })
    const flatMenuKey = flatMenu.map(e=>e.path)
    const page: RouteRecordRaw[] | undefined = view_Routes.find(e => e.name === 'pages')!.children
    return page?.filter(e => !flatMenuKey.includes(e.path)) as RouteRecordRaw[]
}