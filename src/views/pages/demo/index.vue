<template>
    <div>
        <div class="bg-red-100">
            <div class="text-blue-400">自定义指令：</div>
            <h3 v-format-time="'YYYY-MM-DD hh:mm:ss'">{{ new Date().getTime() }}</h3>
        </div>
        <div class="bg-red-200">
            <div class="text-blue-400">全局组件：</div>
        </div>
        <div class="bg-red-200">
            <div class="text-blue-400">请求：</div>
            <button class="mr-8" @click="axiosTest('1')">普通请求</button>
            <button @click="axiosTest('2')">节流请求</button>
        </div>
        <div class="bg-red-200">
            <div class="text-blue-400">获取当前路由对象</div>
            <button @click="getNowRoute">获取</button>
            <div>
                {{ currentRoute }}
            </div>
        </div>
        <div class="bg-test">
            <div class="text-blue-400">tailwind颜色配置</div>
            <div class="w-screen flex gap-4">
                <div class="w-base h-base bg-tahiti-300"></div>
                <button @click="setColor">随机颜色(主题设置)</button>
            </div>
        </div>

        <div ref="draggable" :style="style" class="bg-amber-400 w-[200px] h-[200px] fixed cursor-move select-none">
            <div>VueUse例子</div>
            <div>{{ x }}</div>
            <div>{{ y }}</div>
        </div>

        <div>
            <div class="text-blue-400">element自动导入：</div>
            <el-button type="primary">Primary</el-button>
            <button class="ml-20">修改tailwind的默认背景色为element的</button>
        </div>
    </div>
</template>
<script lang="ts">
export default {
    auto: true,
    route: {
        meta: {
            title: "demo",
            demo: 'test'
        }
    },
};
</script>
<script lang="ts" setup>

import {http} from "@/plugins/axios";
import {useDraggable} from "@vueuse/core";

onBeforeUnmount(() => {
    console.log('组件挂载之前');
});
onUnmounted(() => {
    console.log('组件被销毁之前');
});
const axiosTest = (t: string) => {
    if (t === '1') {
        http.request<any>({
            baseURL: "http://127.0.0.1:8083",
            url: '/user/adminLogin',
            method: 'post',
            q_spinning: true,
            // q_contentType: 'json',
            data: {"userName": 'test', "password": 'testtest'},
            headers: {
                'demo': '111111111111111'
            }
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    if (t === '2') {
        http.request<any>({
            url: 'xxxxx',
            method: "post",
            q_throttle: true,
            data: {"pageIndex": 1, "pageRowSize": 10},

        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
}

const draggable = ref<HTMLElement | null>()
const {x, y, style} = useDraggable(draggable, {
    initialValue: {x: 1700, y: 600},
})


const setColor = () => {
    const r = Math.floor(Math.random() * 255)
    const g = Math.floor(Math.random() * 255)
    const b = Math.floor(Math.random() * 255)
    document.body.style.setProperty("--test--", `rgb(${r}, ${g}, ${b})`);
}
let currentRoute = ref<any>();
const router = useRouter();
const getNowRoute = () => {
    currentRoute.value = router.currentRoute.value;
    console.log(toRaw(currentRoute.value))
}
</script>
