<template>
  <div class="text-2xl">
    <div>num: {{ num }}</div>
    <div>num2: {{ num2 }}</div>
    <div class="bg-red-500 w-min h-min">
      <button @click="addNum">num++</button>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  route: { mate: { title: "1" } },
};
</script>
<script lang="ts" setup>
import { computed, ref, watch } from "vue";

let num = ref<number>(0);
const addNum = () => {
  num.value++;
};
watch(num, (newValue, oldValue) => {
  console.log("watch 已触发", oldValue, newValue);
});
let num2 = computed(() => {
  return num.value + 1;
});
</script>
