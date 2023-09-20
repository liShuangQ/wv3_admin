<template>
    <div class="common-layout h-screen bg-gray-100">
        <el-container>
            <el-aside class="h-screen" style="width: auto;">
                <Menu></Menu>
            </el-aside>
            <el-container>
                <el-header style="height: max-content;padding:0;">
                    <div class="h-[40px] flex items-center bg-white mb-2">
                        <Breadcrumb></Breadcrumb>
                    </div>
                    <div class="flex items-center justify-between ml-1">
                        <div>
                            <HistoryTags></HistoryTags>
                        </div>
                        <div class="flex items-center justify-between mr-4">
                            <SearchMenu></SearchMenu>
                            <MenuUtil></MenuUtil>
                        </div>
                    </div>
                </el-header>
                <el-main class="overflow-hidden " style="padding: 8px;overflow: hidden;">
                    <router-view
                        v-slot="{ Component }"
                        class="h-full w-full bg-white "
                    >
                        <Transition appear enter-active-class="animate__animated animate__fadeIn">
                            <component v-if="refreshPageValue" :is="Component"></component>
                        </Transition>
                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script lang="ts">
export default {
    route: {
        meta: {
            auth: true,
        },
    },
};
</script>
<script lang="ts" setup>
import Menu from './pages/Menu.vue'
import HistoryTags from './pages/HistoryTags.vue'
import SearchMenu from './pages/Search.vue'
import MenuUtil from './pages/MenuUtil.vue'
import Breadcrumb from './pages/Breadcrumb.vue'

let refreshPageValue = ref<boolean>(true);
// const refreshPage = () => {
//   refreshPageValue.value = false;
//   nextTick(() => {
//     refreshPageValue.value = true;
//   });
//   return;
// };

</script>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
</style>
