<template>
    <div class="overflow-y-scroll">
        <div class="h-[500px]">
            <tableCom ref="tableComRef" :tableColumnConfig="tableColumnConfig" :tableConfig="tableConfig"
                      :tableData="tableData"
                      @handle="tableHandle"
                      @tableRowClassName="tableRowClassName"
            >
                <template #address>
                    <el-table-column label="address">
                        <template #default="scope">
                            <div>{{ scope.row }}</div>
                        </template>
                    </el-table-column>
                </template>
            </tableCom>
        </div>
        <div style="margin-top: 20px">
            <el-button @click="tableComRef.toggleSelection([tableData[1], tableData[2]])"
            >控制选中
            </el-button>
            <el-button @click="tableComRef.toggleSelection()">清除选中</el-button>
        </div>
        <div style="margin-top: 20px">
            <el-button @click="tableComRef.resetDateFilter(['date22'])">清除筛选</el-button>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    auto: true
}
</script>
<script lang="ts" setup>
import tableCom from './tableCom.vue'
import {TableConfig, TableColumnConfig} from "@/views/pages/componentDemo/table/types";

let tableColumnConfig = ref<TableColumnConfig[]>([
    {
        label: 'date',
        prop: 'date',
        width: 200,
        sortable: true
    },
    {
        label: 'name',
        prop: 'name',
        width: 500,
        children: [
            {
                label: 'name00',
                prop: 'name00',
            },
            {
                label: 'name11',
                prop: 'name11',
                children: [
                    {
                        label: 'date22',
                        prop: 'date22',
                        sortable: true,
                        filters: [
                            {text: '1', value: '1'},
                            {text: '2', value: '2'},
                        ],
                        filterMethod: (value: string, row: any, column: any) => {
                            const property = column['property']
                            return row[property].toString() === value.toString()
                        }
                    },
                    {
                        label: 'name22',
                        prop: 'name22',
                        slot: true,
                    },
                ]
            },
        ]
    },
    {
        label: 'address',
        prop: 'address',
        slot: true,
    }
])
let tableConfig = ref<TableConfig>({
    stripe: true,
    border: true,
    tooltip: true,
    selection: true,
    height: 500,
    maxHeight: 500
})
let tableData = ref<any>(['', '', '', ''].map((e, index) => {
    return {
        date: '0',
        date11: '0',
        date22: index,
        name: '0',
        name00: '0',
        name11: '0',
        name22: '0',
        address: '0',
    }
}))
const tableComRef = ref<any>(null)

// 注意和stripe会冲突
const tableRowClassName = (e: {
    row: any
    rowIndex: number
}, fn: any) => {
    if (e.rowIndex === 0) {
        return fn('success-row')
    }
    if (e.rowIndex === 2) {
        return fn('warning-row')
    }
    return fn('')
}

const tableHandle = (t: string, d: any) => {
    console.log(t, d)
}


</script>

<style scoped>

</style>