import { App } from "vue";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


export function setupIcons(app: App) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
