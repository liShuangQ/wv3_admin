import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router"; //createWebHistory
import { routes } from "./routes";
import layoutRoutes from "./autoload/index";
const router = createRouter({
  // history: createWebHistory(),
  history: createWebHashHistory(),
  routes: [...routes,...layoutRoutes,],
});
export const setupRouter = async (app: App) => {
  app.use(router);
};
export const layoutRoute = layoutRoutes
export default router;
