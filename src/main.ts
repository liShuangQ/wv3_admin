import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "./router/index";
import { setupPlugins } from "@/plugins";
import "./style/tailwind.css"
// ------store文件夹中除了这3个应均为pinia------
import setGlobalProperties from "./store/globalProperties";
import globalVars from "./store/globalVars";
import setDirective from './store/directive'
//-------------------------------------------

const bootstrap = async () => {
  const app = createApp(App);
  // 挂app方式（不推荐）
  setGlobalProperties(app)
  // 依赖注入方式（推荐）
  app.provide('globalVars', globalVars)
  // 自定义全局指令
  setDirective(app)
  // -------------
  setupPlugins(app);
  await setupRouter(app);
  await router.isReady(); 
  app.mount("#app");
};


bootstrap();
