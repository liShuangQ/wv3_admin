<template>
  <div>
    <div class="bg-red-100">
      <div class="text-blue-400">自定义指令：</div>
      <h3 v-format-time="'YYYY-MM-DD hh:mm:ss'">{{ new Date().getTime() }}</h3>
    </div>
    <div class="bg-red-200">
      <div class="text-blue-400">全局组件：</div>
      <all1></all1>
    </div>
    <div class="bg-red-200">
      <div class="text-blue-400">请求：</div>
      <button class="mr-8" @click="axiosTest('1')">普通请求</button>
      <button @click="axiosTest('2')">节流请求</button>
    </div>

  </div>
</template>
<script lang="ts">
export default {
  route: {mate: {title: "1"}},
};
</script>
<script lang="ts" setup>

import {http} from "@/plugins/axios";

const axiosTest = (t: string) => {
  if (t === '1') {
    http.request<any>({
      baseURL:"xxxxx",
      url: 'xxxxx',
      method: "post",
      data:{ "pageIndex": 1, "pageRowSize": 10},
      headers: {
        'demo': '111111111111111'
      }
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
  if (t === '2') {
    http.request<any>({
      url: 'xxxxx',
      method: "post",
      throttle: true,
      data:{ "pageIndex": 1, "pageRowSize": 10},
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }
}
</script>
