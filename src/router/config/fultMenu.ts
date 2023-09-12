import {cloneDeep} from "lodash";
import menu, {PagesMenu} from "@/router/menu";

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
cloneDeep(menu).forEach(e => {
    if (!e.children || e.children.length === 0) {
        flatMenu.push(e)
    } else {
        deep(e.children)
    }
})
export default flatMenu