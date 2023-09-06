import { RouteRecordRaw } from "vue-router";
const layoutsFun = (require as any).context('../../layouts', false, /\.vue$/,'sync');
let layouts:{} = {}
layoutsFun.keys().forEach((k:string )=>{
  layouts[k] = layoutsFun(k)
})

const viewsFun = (require as any).context('../../views', true, /\index.vue$/,'sync');
let views:{} = {}
viewsFun.keys().forEach((k:string )=>{
    views[k] = viewsFun(k)
})


function getRoutes() {
  const layoutRoutes = [] as RouteRecordRaw[];
  Object.entries(layouts).forEach(([file, module]) => {
    const route = getRouteByModule(file, module as any);
    
    route["children"] = getChildrenRoutes(route);
    layoutRoutes.push(route);
  });
  return layoutRoutes;
}

function getChildrenRoutes(layoutRoute: RouteRecordRaw) {
  const routes = [] as RouteRecordRaw[];
  Object.entries(views).forEach(([file, module]) => {
    
    if (file.includes(`${layoutRoute.name as string}`)) {
      const route = getRouteByModule(file, module as any);
      routes.push(route);
    }
  });
  
  return routes;
}

function getRouteByModule(file: string, module: { [key: string]: any }) {
  const path = file.replace(/^\.|\/index|\.vue/gi, "");
  
  const router = {
    name: path.replace(/^\//, '').replace(/\//g, '.'),
    path: path,
    component: module.default,
    meta:{}
  } as RouteRecordRaw;

  //自定义路由: export default {
  //   route: { path: "/user" },
  // };
  return Object.assign(router, module.default?.route);
  
}

const routes = getRoutes()
export default routes;
