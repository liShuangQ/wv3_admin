export interface TableConfig {
    /**
     * stripe 可以创建带斑马纹的表格。 如果 true, 表格将会带有斑马纹。
     */
    stripe?: boolean
    /**
     * 默认情况下，Table 组件是不具有竖直方向的边框的， 如果需要，可以使用 border 属性，把该属性设置为 true 即可启用。
     */
    border?: boolean
    /**
     * 纵向内容过多时，可选择固定表头。只要在 el-table 元素中定义了 height 属性，即可实现固定表头的表格，而不需要额外的代码。
     */
    height?: number | string
    /**
     * 通过设置 max-height 属性为 el-table 指定最大高度。 此时若表格所需的高度大于最大高度，则会显示一个滚动条。
     */
    maxHeight?: number | string
    /**
     * show-overflow-tooltip属性。 默认情况下，如果单元格内容过长，会占用多行显示。 若需要单行显示可以使用 show-overflow-tooltip 属性，它接受一个 Boolean， 为 true 时多余的内容会在 hover 时以 tooltip 的形式显示出来。
     */
    tooltip?: boolean
    /**
     * XXX 自定义el-table-column，要使用插槽时使用，插槽名称为 #subColumn
     * 可配合sub-column组件进行使用
     */
    CustomColumn?: boolean
    /**
     * 实现多选
     */
    selection?: boolean
}

export interface TableColumnConfig {
    /**
     * prop 属性来对应对象中的键名即可填入数据
     */
    prop: string
    /**
     * 用 label 属性来定义表格的列名
     */
    label: string
    /**
     * 可以使用 width 属性来定义列宽
     */
    width?: number | string
    /**
     * 固定列需要使用 fixed 属性，它接受 Boolean 值。 如果为 true, 列将被左侧固定. 它还接受传入字符串，left 或 right，表示左边固定还是右边固定。
     */
    fixed?: boolean | 'left' | 'right'
    /**
     * 数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。
     * 只需要将el-table-column 放置于el-table-column 中，你可以实现组头。
     */
    children?: TableColumnConfig[]
    /**
     * 在列中设置 sortable 属性即可实现以该列为基准的排序， 接受一个 Boolean，默认为 false。 可以通过 Table 的 default-sort 属性设置默认的排序列和排序顺序。 可以使用 sort-method 或者 sort-by 使用自定义的排序规则。 如果需要后端排序，需将 sortable 设置为 custom，同时在 Table 上监听 sort-change 事件， 在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。 在本例中，我们还使用了 formatter 属性，它用于格式化指定列的值， 接受一个 Function，会传入两个参数：row 和 column， 可以根据自己的需求进行处理。
     */
    sortable?: boolean
    /**
     * 自定义一级表头的el-table-column
     */
    slot?: boolean
    /**
     * filters 是一个数组，决定可筛选的选项
     */
    filters?: { text: string, value: string }[]
    /**
     * filter-method 是一个方法，它用于决定某些数据是否显示， 会传入三个参数：value, row 和 column。
     */
    filterMethod?: Function
}

