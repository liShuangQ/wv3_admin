<!---->
<!-- 不支持树形-->
<!-- 合计功能考虑没必要，后端返回或自己计算即可-->
<!-- 合并单元格后续考虑加入-->
<!-- TODO：对于表格内编辑的集成-->
<!-- XXX：后续经过使用补全el-table和el-table-column的属性-->
<!---->
<template>
    <el-table
        ref="tableRef"
        :border="props.tableConfig.border ||true "
        :data="props.tableData"
        :height="props.tableConfig.height || 500"
        :highlight-current-row="props.tableConfig.highlightCurrentRow || false"
        :row-class-name="tableRowClassNameFun"
        :size="props.tableConfig.size || 'default'"
        :stripe="props.tableConfig.stripe || true "
        :table-layout="props.tableConfig.tableLayout || 'fixed'"
        style="width: 100%"
        @selection-change="(e)=>emit('handle', 'selection', e)"
        @current-change="(e)=>emit('handle', 'current', e)"
    >
        <!--        功能区-->
        <el-table-column v-if="props.tableConfig.index || false" :index="indexMethodFun" type="index"/>
        <el-table-column v-if="props.tableConfig.expand || false" type="expand">
            <template #default="props">
                <slot :row="props.row" name="expand"></slot>
            </template>
        </el-table-column>
        <el-table-column v-if="props.tableConfig.selection || false" align="center" header-align="center"
                         type="selection" width="50"/>
        <!--         ----->
        <slot v-if="props.tableConfig.customColumn || false" name="subColumn"></slot>
        <template v-for="(item) in props.tableColumnConfig" v-else
                  :key="item.prop">
            <el-table-column
                v-if="item.slot"
                :align="item.align || 'center'"
                :column-key="item.prop"
                :header-align="item.headerAlign || 'center'"
                :label="item.label"
                :prop="item.prop"
                :show-overflow-tooltip="props.tableConfig.tooltip || true"
                :width="item.width || ''"
            >
                <template #header>
                    <slot :name="'header-' + item.prop"></slot>
                </template>
                <template #default="scope">
                    <slot :name="item.prop" :row="scope.row"></slot>
                </template>
            </el-table-column>
            <sub-column v-else :columnConfig="item" :tooltip="props.tableConfig.tooltip || true"></sub-column>
        </template>
    </el-table>
</template>
<script lang="ts" setup>
import {TableColumnConfig, TableConfig} from './table-component'
import subColumn from "@/components/globalComponents/ElementTable/subColumn.vue";
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
    (event: "handle", type: string, data: any): string
    (event: "tableRowClassName", e: any, fn: Function): string
    (event: "indexMethod", index: number, fn: Function): number
}>();
const tableRef = ref<InstanceType<typeof ElTable>>()
/**
 * 设置表格行的样式信息，注意配合element的表格样式，详情见官网同名方法
 * @param e
 */
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
/**
 * type=index时的方法，使用回调函数设置自定义处理的值，当无自定义时，默认返回index + 1
 * @param index
 */
const indexMethodFun = (
    index: number
) => {
    let result = NaN
    emit('indexMethod', index,
        (i: number) => {
            result = i
        }
    )
    if (Number.isNaN(result)) {
        return index + 1
    } else {
        return result
    }
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
/**
 * 表格的方法，用于操作表格组件的ref方法调用
 *
 * clearSelection	用于多选表格，清空用户的选择
 *
 * getSelectionRows	返回当前选中的行
 *
 * toggleRowSelection	用于多选表格，切换某一行的选中状态， 如果使用了第二个参数，则可直接设置这一行选中与否。row, selected
 *
 * toggleAllSelection	用于多选表格，切换全选和全不选
 *
 * toggleRowExpansion	用于可扩展的表格或树表格，如果某行被扩展，则切换。 使用第二个参数，您可以直接设置该行应该被扩展或折叠。row, expanded
 *
 * setCurrentRow	用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。	row
 *
 * clearSort	用于清空排序条件，数据会恢复成未排序的状态
 *
 * clearFilter	传入由columnKey 组成的数组以清除指定列的过滤条件。 如果没有参数，清除所有过滤器	columnKeys
 *
 * doLayout	对 Table 进行重新布局。 当表格可见性变化时，您可能需要调用此方法以获得正确的布局
 *
 * sort	手动排序表格。 参数 prop 属性指定排序列，order 指定排序顺序。	prop: string, order: string
 *
 * scrollTo	滚动到一组特定坐标	(options: ScrollToOptions | number, yCoord?: number)
 *
 * setScrollTop	设置垂直滚动位置	top
 *
 * setScrollLeft 设置水平滚动位置	left
 * @param methodName 方法名
 * @param d 参数
 */
const tableMethod = (methodName: string, ...d: any): void => {
    tableRef.value![methodName](...d)
}


defineExpose(
    {toggleSelection, resetDateFilter, tableMethod}
)

</script>

<style scoped>

</style>