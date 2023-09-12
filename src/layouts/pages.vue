<template>
  <div class="common-layout h-screen">
    <el-container>
      <el-aside width="200px" class=" h-screen ">
        <Menu></Menu>
      </el-aside>
      <el-container>
        <el-header class="bg-red-500">Header</el-header>
        <el-main>
          <router-view
              v-slot="{ Component }"
              class="overflow-auto h-max w-max bg-white"
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
