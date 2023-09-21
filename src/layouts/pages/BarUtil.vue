<template>
    <div class="pr-4 h-full flex gap-2 justify-around items-center cursor-pointer">
        <el-tooltip
            effect="dark"
            placement="bottom"
            content="刷新当前页面"
        >
            <el-icon size="22" @click="emit('refreshPage')">
                <RefreshRight/>
            </el-icon>
        </el-tooltip>
        <el-tooltip
            effect="dark"
            placement="bottom-end"
            content="使当前页面全屏显示"
        >
            <el-icon size="20" @click="emit('pageFullScreen')">
                <FullScreen/>
            </el-icon>
        </el-tooltip>

        <el-dropdown class="ml-2">
            <el-avatar shape="square" :size="30" src="../../../public/favicon.ico"/>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item @click="userStore.userLogOut()">登出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>
<script setup lang="ts">
import user from "@/store/user";

const emit = defineEmits<{
    (event: 'refreshPage'): void
    (event: 'pageFullScreen'): void
}>()
const userStore = user()

</script>

<style scoped>

</style>