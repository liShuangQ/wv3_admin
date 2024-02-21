<template>
    <el-table-column
        :align="columnConfig.align || 'center'"
        :column-key="columnConfig.prop"
        :filter-method="(columnConfig.filterMethod as any)"
        :filters="columnConfig.filters"
        :header-align="columnConfig.headerAlign || 'center'"
        :label="columnConfig.label"
        :prop="columnConfig.prop"
        :show-overflow-tooltip="props.tooltip"
        :sortable="columnConfig.sortable || false"
        :width="columnConfig.width || ''"
    >
        <template
            v-if="columnConfig.children && columnConfig.children.length > 0"
        >
            <sub-column
                v-for="item in columnConfig.children"
                :key="item.prop"
                :columnConfig="item"
                :tooltip="props.tooltip"
            >
            </sub-column>
        </template>

        <!-- XXX: 可能会小概率引发和自身的data变量的key冲突 -->
        <template v-if="columnConfig.isEdit" #default="scope">
            <el-input
                v-if="scope.row[columnConfig.prop + 'Edit']"
                v-model="scope.row[columnConfig.prop]"
                placeholder=""
            />
            <span v-else>{{ scope.row[columnConfig.prop] }}</span>
        </template>
    </el-table-column>
</template>

<script lang="ts" setup>
import { TableColumnConfig } from "./table-component";

const props = defineProps<{
    columnConfig: TableColumnConfig;
    tooltip?: boolean;
}>();
</script>

<style scoped></style>
