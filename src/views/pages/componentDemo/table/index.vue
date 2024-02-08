<template>
    <div class="overflow-y-scroll">
        <el-button @click="tableConfig.border = !tableConfig.border">边框</el-button>
        <div class="h-[500px]">
            <ElementTable ref="tableComRef" :tableColumnConfig="tableColumnConfig" :tableConfig="tableConfig"
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
                        <p m="t-0 b-2">Address: address</p>
                        <p m="t-0 b-2">Zip: zip </p>
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

        </div>
    </div>
</template>

<script lang="ts">
export default {
    auto: true
}
</script>
<script lang="ts" setup>

import {TableColumnConfig, TableConfig} from "@/components/globalComponents/ElementTable/table-component";

const tableComRef = ref<any>(null)
let tableColumnConfig = ref<TableColumnConfig[]>([
    {
        label: '表头1',
        prop: 'date',
        width: 200,
        sortable: true
    },
    {
        label: '表头2',
        prop: 'name',
        width: 500,
        children: [
            {
                label: '2-1',
                prop: 'name00',
            },
            {
                label: '2-2',
                prop: 'name11',
                children: [
                    {
                        label: '2-2-1',
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
                        label: '2-2-2',
                        prop: 'name22',
                        slot: true,
                    },
                ]
            },
        ]
    },
    {
        label: '表头3',
        prop: 'address',
        width: 'auto',
        slot: true,
    }
])
let tableConfig = ref<TableConfig>({
    // stripe: true,
    border: false,
    // tooltip: true,
    selection: true,
    // expand: true,
    // index: true,
    // highlightCurrentRow: true,
    // customColumn: false,
    // height: 500,
    // maxHeight: 500,
    // tableLayout: 'fixed'
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