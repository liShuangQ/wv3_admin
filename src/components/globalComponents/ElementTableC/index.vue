<!---->
<!-- liShuangQ-->
<!-- 不支持树形-->
<!-- 合计功能考虑没必要，后端返回或自己计算即可-->
<!-- 合并单元格后续考虑加入-->
<!-- XXX：后续经过使用补全el-table和el-table-column的属性-->
<!---->
<template>
    <el-table
        ref="tableRef"
        :border="props.tableConfig.border || false"
        :data="props.tableData"
        :highlight-current-row="props.tableConfig.highlightCurrentRow || false"
        :row-class-name="tableRowClassNameFun"
        :size="props.tableConfig.size || 'default'"
        :stripe="props.tableConfig.stripe || false"
        :table-layout="props.tableConfig.tableLayout || 'fixed'"
        style="width: 100%; height: calc(100% - 48px)"
        @selection-change="(e) => emit('handle', 'selection', e,'selection')"
        @current-change="(e) => emit('handle', 'current', e,'current')"
    >

        <!--        功能区-->
        <el-table-column
            v-if="props.tableConfig.index || false"
            :index="indexMethodFun"
            type="index"
        />
        <el-table-column v-if="props.tableConfig.expand || false" type="expand">
            <template #default="props">
                <slot :row="props.row" name="expand"></slot>
            </template>
        </el-table-column>
        <el-table-column
            v-if="props.tableConfig.selection || false"
            align="center"
            header-align="center"
            type="selection"
            width="50"
        />
        <!--         ----->
        <slot
            v-if="props.tableConfig.customColumn || false"
            name="subColumn"
        ></slot>
        <template
            v-for="item in props.tableColumnConfig"
            v-else
            :key="item.prop"
        >
            <el-table-column
                v-if="item.slot"
                :align="item.align || 'center'"
                :column-key="item.prop"
                :header-align="item.headerAlign || 'center'"
                :label="item.label"
                :prop="item.prop"
                :show-overflow-tooltip="props.tableConfig.tooltip || false"
                :width="item.width || ''"
            >
                <template #header>
                    <slot :name="'header-' + item.prop"></slot>
                </template>
                <template #default="scope">
                    <slot :name="item.prop" :row="scope.row"></slot>
                </template>
            </el-table-column>
            <sub-column
                v-else
                :columnConfig="item"
                :faEmit="emit"
                :tooltip="props.tableConfig.tooltip || false"
            ></sub-column>
        </template>
    </el-table>
    <el-pagination
        v-model:current-page="pageData.currentPage"
        v-model:page-size="pageData.pageSize"
        :background="pageData.background"
        :disabled="pageData.disabled"
        :layout="pageData.layout || 'total, sizes, prev, pager, next, jumper'"
        :page-sizes="[10, 20, 50, 100, 200, 500]"
        :small="pageData.small"
        :total="pageData.total"
        class="mt-4 float-right"
        @size-change="(e:number)=>emit('handle', 'handleSizeChange', {val:e,currentPage:pageData.currentPage,pageSize:pageData.pageSize},'handleSizeChange')"
        @current-change="(e:number)=>emit('handle', 'handleCurrentChange', {val:e,currentPage:pageData.currentPage,pageSize:pageData.pageSize},'handleCurrentChange')"
    />
</template>
<script lang="ts" setup>
import {PaginationConfig, TableColumnConfig, TableConfig, TableDefineExpose,} from "./table-component";
import subColumn from "@/components/globalComponents/ElementTableC/subColumn.vue";
import {ElTable} from "element-plus";

const props = withDefaults(
    defineProps<{
        tableConfig: TableConfig;
        tableColumnConfig: TableColumnConfig[];
        paginationConfig: PaginationConfig;
        tableData: any[]; // 是否必传
    }>(),
    {
        tableConfig: () => {
            return {};
        },
        tableColumnConfig: () => {
            return [
                {
                    prop: "",
                    label: "",
                },
            ];
        },
        paginationConfig: () => {
            return {
                currentPage: 1,
                pageSize: 10,
                total: 0,
            };
        },
        tableData: () => {
            return [];
        },
    }
);
const emit = defineEmits<{
    (event: "handle", type: string, data: any, key: string): void;
    (event: "tableRowClassName", e: any, fn: Function): string;
    (event: "indexMethod", e: number, fn: Function): string;
}>();
const tableRef = ref<InstanceType<typeof ElTable>>();
let pageData = ref<PaginationConfig>(props.paginationConfig);

// --------------------------------------------------------
/**
 * 设置表格行的样式信息，注意配合element的表格样式，详情见官网同名方法
 * @param e
 */
const tableRowClassNameFun = (e: { row: any; rowIndex: number }) => {
    let result = "";
    emit("tableRowClassName", e, (i: string) => {
        result = i;
    });
    return result;
};
/**
 * type=index时的方法，使用回调函数设置自定义处理的值，当无自定义时，默认返回index + 1
 * @param index
 */
const indexMethodFun = (index: number) => {
    let result = NaN;
    emit("indexMethod", index, (i: number) => {
        result = i;
    });
    if (Number.isNaN(result)) {
        return index + 1;
    } else {
        return result;
    }
};

// ------------------------供外部调用-------------------------
const toggleSelection = (rows?: any[]): void => {
    if (rows) {
        rows.forEach((row) => {
            // TODO: improvement typing when refactor table
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            tableRef.value!.toggleRowSelection(row, undefined);
        });
    } else {
        tableRef.value!.clearSelection();
    }
};
const resetDateFilter = (
    columnKeys: string[] | undefined = undefined
): void => {
    tableRef.value!.clearFilter(columnKeys);
};

const tableMethod = (methodName: string, ...d: any): void => {
    tableRef.value![methodName](...d);
};

defineExpose<TableDefineExpose>({
    toggleSelection,
    resetDateFilter,
    tableMethod,
});
</script>
<style scoped></style>
