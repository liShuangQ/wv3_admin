<template>
    <el-table
        ref="tableRef"
        :border="props.tableConfig.border || false "
        :data="props.tableData"
        :height="props.tableConfig.height || 300"
        :row-class-name="tableRowClassNameFun"
        :stripe="props.tableConfig.stripe || false "
        style="width: 100%"
        @selection-change="handleSelectionChange"
    >
        <el-table-column v-if="props.tableConfig.selection || false" type="selection" width="55"/>
        <slot v-if="props.tableConfig.CustomColumn || false" name="subColumn"></slot>
        <template v-for="(item) in props.tableColumnConfig" v-else
                  :key="item.prop">
            <slot v-if="item.slot" :name="item.prop"></slot>
            <sub-column v-else :columnConfig="item" :tooltip="props.tableConfig.tooltip||false"></sub-column>
        </template>
    </el-table>
</template>
<script lang="ts" setup>
import {TableColumnConfig, TableConfig} from './types'
import subColumn from "@/views/pages/componentDemo/table/subColumn.vue";
import {ElTable} from "element-plus";

const props = withDefaults(
    defineProps<{
        tableConfig: TableConfig
        tableColumnConfig: TableColumnConfig[]
        tableData: any[]; // 是否必传
    }>(),
    {
        tableConfig: () => {
            return {}
        },
        tableColumnConfig: () => {
            return [{
                prop: '',
                label: '',
            }]
        },
        tableData: () => {
            return [];
        },
    }
);
let emit = defineEmits<{
    (event: "tableRowClassName", e: any, fn: any): string
    (event: "handle", type: string, data: any): string
}>();
const tableRef = ref<InstanceType<typeof ElTable>>()

const tableRowClassNameFun = (e: {
    row: any
    rowIndex: number
}) => {
    let result = ''
    emit('tableRowClassName', e,
        (i: string) => {
            result = i
        }
    )
    return result
}
const handleSelectionChange = (val: any[]): void => {
    emit('handle', 'multipleSelection', val)
}


// ------------------------供外部调用-------------------------
/**
 * 多选时控制选中信息，rows不传入时全部去除
 * @param rows
 */
const toggleSelection = (rows?: any[]): void => {
    if (rows) {
        rows.forEach((row) => {
            // TODO: improvement typing when refactor table
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            tableRef.value!.toggleRowSelection(row, undefined)
        })
    } else {
        tableRef.value!.clearSelection()
    }
}
/**
 * 清除筛选信息，d不传入时全部去除
 * @param columnKeys
 */
const resetDateFilter = (columnKeys: string[] | undefined = undefined): void => {
    tableRef.value!.clearFilter(columnKeys)
}


defineExpose(
    {toggleSelection, resetDateFilter}
)

</script>

<style scoped>

</style>