import {
    PaginationConfig,
    TableColumnConfig,
    TableConfig
} from "@/components/globalComponents/ElementTableC/table-component";

export let tableColumnConfig = ref<TableColumnConfig[]>([
    {
        label: '表头1',
        prop: 'date',
        width: 200,
        sortable: true,
    },
    {
        label: '表头2',
        prop: 'name',
        width: 500,
        children: [
            {
                label: '2-1',
                prop: 'name00',
                isEdit: true
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
                    {
                        label: '3-3-3',
                        prop: 'name33',
                        isLink: 'success',
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
export let tableConfig = ref<TableConfig>({
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
export let tableData = ref<any[]>([])
export let paginationConfig = ref<PaginationConfig>({
    currentPage: 1,
    pageSize: 10,
    total: 0,
    background: true,
})