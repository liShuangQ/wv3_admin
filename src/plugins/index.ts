import { App } from "vue";
import setupPinia from "./pinia";

// 自动注册全局组件  globalComponents
// function autoRegisterComponents(app: App) {
  // const components = import.meta.glob(
  //   "../components/globalComponents/*/index.vue",{eager:true}
  // ) as any
  // Object.keys(components).forEach((k) => {
  //   const cache = k.split("/")
  //   // const name = k.split("/").pop()?.split(".").shift() as string;
  //   const name = k.split("/")[cache.length -2] as string;
  //   app.component(name, components[k].default);
  // });
// }

export function setupPlugins(app: App) {
  setupPinia(app);
}
