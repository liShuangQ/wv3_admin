import { RouteRecordRaw } from "vue-router";

// 全局路由
export const routes = [
  { name:"index", path: "/", redirect: "/pages/home" },
  {
    name: "notfound",
    path: "/:any(.*)",
    component: () => import("@/views/error/404/index.vue"),
    children: [],
    meta: { title: "404页面", icon: "", show: true },
  },
] as RouteRecordRaw[];
 