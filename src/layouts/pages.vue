<template>
  <router-view
    v-slot="{ Component }"
    :class="'overflow-auto h-full w-full bg-white'"
  >
    <Transition appear enter-active-class="animate__animated animate__fadeIn">
      <component v-if="refreshPageValue" :is="Component"></component>
    </Transition>
  </router-view>
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
import { ref } from "vue";

let refreshPageValue = ref<boolean>(true);
// const refreshPage = () => {
//   refreshPageValue.value = false;
//   nextTick(() => {
//     refreshPageValue.value = true;
//   });
//   return;
// };
</script>
<style scoped></style>
