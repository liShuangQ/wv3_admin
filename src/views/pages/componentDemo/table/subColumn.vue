<template>

    <el-table-column
        :column-key="columnConfig.prop"
        :filter-method="columnConfig.filterMethod"
        :filters="columnConfig.filters"
        :label="columnConfig.label"
        :prop="columnConfig.prop"
        :show-overflow-tooltip="props.tooltip"
        :sortable="columnConfig.sortable || false"
        :width="columnConfig.width || ''"
    >
        <template v-if="columnConfig.children && columnConfig.children.length > 0">
            <sub-column
                v-for="(item) in columnConfig.children"
                :key="item.prop"
                :columnConfig="item"
                :tooltip="props.tooltip"
            >
            </sub-column>
        </template>
    </el-table-column>

</template>


<script lang="ts" setup>
import {TableColumnConfig} from "@/views/pages/componentDemo/table/types";


const props = defineProps<{
    columnConfig: TableColumnConfig
    tooltip?: boolean
}>()
</script>

<style scoped>

</style>