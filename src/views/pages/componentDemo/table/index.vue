<template>
    <div class="overflow-y-scroll">
        <div class="h-[500px] ">
            <ElementTable ref="tableComRef"
                          :paginationConfig="paginationConfig"
                          :tableColumnConfig="tableColumnConfig"
                          :tableConfig="tableConfig"
                          :tableData="tableData"
                          @handle="tableHandle"
                          @indexMethod="indexMethod"
                          @tableRowClassName="tableRowClassName"
            >
                <template #expand="props">
                    {{ props.row }}
                    <div m="4">
                        <p m="t-0 b-2">State: state </p>
                        <p m="t-0 b-2">City: city </p>
                    </div>
                </template>
                <template #header-address>
                    自定义表头
                </template>
                <template #address="scope">
                    <div>自定义表格（只支持一级表头的表格）{{ scope.row }}</div>
                </template>
            </ElementTable>
        </div>
        <div style="margin-top: 20px">
            <el-button @click="tableComRef.toggleSelection([tableData[1], tableData[2]])"
            >控制选中
            </el-button>

            <el-button @click="tableComRef.toggleSelection()">清除选中</el-button>

            <el-button @click="tableComRef.tableMethod('clearSelection')">
                清除选中2
            </el-button>


        </div>
        <div style="margin-top: 20px">
            <el-button @click="tableComRef.resetDateFilter(['date22'])">清除筛选</el-button>
            <el-button @click="tdadd()">添加数据</el-button>
            <el-button @click="pageChange()">改变页码</el-button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    auto: true
}
</script>
<script lang="ts" setup>

import {paginationConfig, tableColumnConfig, tableConfig, tableData} from "@/views/pages/componentDemo/table/config";

const tableComRef = ref<any>(null)

const tdadd = () => {
    tableData.value.push({
        date: new Date(),
        date11: 'add',
        date22: 'add',
        name: 'add',
        name00: 'add',
        name11: 'add',
        name22: 'add',
        address: 'add',
    })
    paginationConfig.value.total = tableData.value.length
}
const pageChange = () => {
    paginationConfig.value.currentPage = 3
    paginationConfig.value.background = !paginationConfig.value.background
    console.log(paginationConfig, 'paginationConfig')
}

// 注意和stripe会冲突
const tableRowClassName = (e: {
    row: any
    rowIndex: number
}, fn: any) => {
    // if (e.rowIndex === 0) {
    //     return fn('success-row')
    // }
    // if (e.rowIndex === 2) {
    //     return fn('warning-row')
    // }
    // return fn('')
}

const tableHandle = (t: string, d: any) => {
    console.log(t, d, 'tableHandle')
}
const indexMethod = (index: number, fn: Function) => {
    // fn(index * 2)
}


</script>

<style scoped>

</style>