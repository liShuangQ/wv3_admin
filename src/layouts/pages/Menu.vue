<template>
  <div class="w-full h-full">
    <div class="w-full h-[40px] text-center leading-10">
      WV3
    </div>
    <el-menu
        style="height: calc(100% - 40px - 40px)"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :unique-opened="true"
        ref="menuRef"
        @select="menuSelect"
        :default-active="getNowMenu('path')"
        :default-openeds="getNowMenu('faPath')"
    >
      <!--      router-->

      <template v-for="item in menuData" :key="item.path">
        <template v-if="!item.children || item.children === 0">
          <el-menu-item :index="item.path">
            <el-icon v-if="item.icon && item.icon !== ''">
              <component :is="item.icon"></component>
            </el-icon>
            <div v-else style="width: 24px"></div>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
        <template v-else>
          <sub-menu :key="item.path" :SubItem='item'></sub-menu>
        </template>
      </template>
      <el-icon @click="isCollapse = !isCollapse"
               style="height: 40px;font-size: 24px;text-align: center;width: 100%"
               class="hover:bg-gray-100"
      >
        <Expand v-show="isCollapse"/>
        <Fold v-show="!isCollapse"/>
      </el-icon>
    </el-menu>
  </div>
</template>

<script lang="ts">
import menuData, {PagesMenu} from '@/router/menu/pages'
import SubMenu from "./SubMenu.vue";
import router from "@/router";
import {cloneDeep} from 'lodash'

export default defineComponent({
  components: {
    "sub-menu": SubMenu,
  },
  setup() {
    const isCollapse = ref<boolean>(false)
    let menuRef = ref<any>(null)
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

    cloneDeep(menuData).forEach(e => {
      if (!e.children || e.children.length === 0) {
        flatMenu.push(e)
      } else {
        deep(e.children)
      }
    })
    let getNowMenu = (type: 'faPath' | 'path'): string[]|string => {
      const menu = flatMenu.find(e => e.path === router.currentRoute.value.path) as PagesMenu
      return menu[type]
    }

    const menuSelect = (index: string, indexPath: string[], item: object, routeResult: object) => {
      router.push({path: index});

      // console.log(index)
      // console.log(indexPath)
      // console.log(item)
      // console.log(routeResult)
    }

    return {
      menuData, isCollapse, menuRef, menuSelect, getNowMenu
    }
  }
})

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>