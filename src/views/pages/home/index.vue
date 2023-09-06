<template>
  <h1 class="text-red-500 w-[100px]">
    <div v-for="(item, index) in layoutRoute" :key="index">
      <div class="flex gap-4">
        <div class="text-blue-500">{{ item.meta?.title ?? item.name }}</div>
        <div class="cursor-pointer" @click="to(item.path)">{{ item.path }}</div>
        <div v-if="item.children">
          <div v-for="(item2, index2) in item.children" :key="index2">
            <!-- XXX -->
            <div class="flex gap-4" v-if="item2.name != 'pages.home'">
              <div class="text-blue-500">
                {{ item2.meta?.title ?? item2.name }}
              </div>
              <div class="cursor-pointer" @click="to(item2.path)">
                {{ item2.path }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </h1>
</template>
<script lang="ts" setup>
import router, { layoutRoute } from "@/router/index";
const to = (path: string) => {
  router.push({ path: path });
};

</script>
