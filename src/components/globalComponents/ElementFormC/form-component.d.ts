export interface FormConfig {
    inline?: boolean
    labelPosition?: 'left' | 'right' | 'top'
    labelWidth?: string | number
    /**
     * 表单域标签的后缀
     */
    labelSuffix?: string
    /**
     * 是否隐藏必填字段标签旁边的红色星号。
     */
    hideRequiredAsterisk?: boolean
    /**
     * 星号的位置。
     */
    requireAsteriskPosition?: 'left' | 'right'
    showMessage?: boolean
    /**
     * 是否以行内形式展示校验信息
     */
    inlineMessage?: boolean
    /**
     * 是否在输入框中显示校验结果反馈图标
     */
    statusIcon?: boolean
    /**
     * 是否在 rules 属性改变后立即触发一次验证
     */
    validateOnRuleChange?: boolean
    size?: '' | 'large' | 'default' | 'small'
    /**
     * 是否禁用该表单内的所有组件。 如果设置为 true, 它将覆盖内部组件的 disabled 属性
     */
    disabled?: boolean
    /**
     * 当校验失败时，滚动到第一个错误表单项
     */
    scrollToError?: boolean
}

interface BaseConfig {
    type?: string
    key: string,
    label?: string,
    value?: any,
    rule?: any,
    col?: number,
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    size?: "large" | "small" | "default" | ""
    elem?: 'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange'
}

// <el-xxx
// v-if="item.type === 'autocomplete'"
//     v-model="formModel[item.key]"
// :clearable="item.clearable"
// :disabled="item.disabled"
// :placeholder="
// item.placeholder
//     ? item.placeholder
//     : '请输入' + item.label
// "
// :placement="item.placement || 'bottom-start'"
// :size="item.size || formConfig.size || 'default'"
// @change="(value:string|number)=>emit('handle','change',item.key,value,'')"
//     >
//     </el-xxx>
interface InputConfig {
    /**
     * 在 formatter的情况下显示值，我们通常同时使用 parser
     */
    formatter?: Function
    parser?: Function
    /**
     * element的 show-password 属性，得到一个可切换显示隐藏的密码框
     */
    showPassword?: boolean
    /**
     * 在输入框中（后）添加图标
     */
    suffixIcon?: string
    /**
     * 在输入框中（前）添加图标
     */
    prefixIcon?: string
    /**
     * 用于输入多行文本信息可缩放的输入框。
     */
    textarea?: boolean
    /**
     * 配合textarea，设置文字输入类型的 autosize 属性使得根据内容自动调整的高度。 你可以给 autosize 提供一个包含有最大和最小高度的对象，让输入框自动调整。
     */
    autosize?: boolean | { minRows?: number, maxRows?: number }
    /**
     * 启用在输入框中前置一个元素的插槽，通常是标签或按钮。:name="'prepend-' + item.key",只对非 type="textarea" 有效
     */
    prepend?: boolean
    /**
     * 启用在输入框中后置一个元素的插槽，通常是标签或按钮。:name="'prepend-' + item.key",只对非 type="textarea" 有效
     */
    append?: boolean
    /**
     * 使用 maxlength 和 minlength 属性, 来控制输入内容的最大字数和最小字数。
     */
    maxlength?: string | number
    /**
     * 使用 maxlength 和 minlength 属性, 来控制输入内容的最大字数和最小字数。
     */
    minlength?: string | number
    /**
     * 允许你通过设置 show-word-limit 到 true 来显示剩余字数。
     */
    showWordLimit?: boolean
    /**
     * 是否开启插槽
     */
    suffix?: boolean
    /**
     * 输入建议对象中用于显示的键名
     */
    valueKey?: string
    /**
     * 获取输入建议的防抖延时，单位为毫秒
     */
    debounce?: number
    placement?: 'top' | 'top- start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
}

interface SelectConfig {
    option?: {
        value: string,
        label: string
        disabled?: boolean
    }[],
    /**
     * 为 el-select 设置 multiple 属性即可启用多选， 此时 v-model 的值为当前选中值所组成的数组。 默认情况下选中值会以 Tag 组件的形式展现。
     */
    multiple?: boolean
    /**
     * 可以设置 collapse-tags 属性将它们合并为一段文字。
     */
    collapseTags?: boolean
    /**
     * 您可以使用 collapse-tags-tooltip 属性来启用鼠标悬停折叠文字以显示具体所选值的行为。
     */
    collapseTagsTooltip?: boolean
    min?: number
    max?: number
    button?: boolean
    border?: boolean
}

interface TimeSelectConfig {
    /**
     * 文本框可输入
     */
    editable?: boolean
    /**
     * 显示在输入框中的格式
     */
    format?: string
    /**
     * 选择范围时的分隔符
     */
    rangeSeparator?: string
    valueFormat?: string
    /**
     * 在范围选择器里取消两个日期面板之间的联动
     */
    unlinkPanels?: boolean
    /**
     * 一个用来判断该日期是否被禁用的函数，接受一个 Date 对象作为参数。 应该返回一个 Boolean 值。
     */
    disabledDate?: Function
    startPlaceholder?: string
    endPlaceholder?: string
    dateFormat?: string
    timeFormat?: string
    /**
     * 是否为时间范围选择
     */
    isRange?: boolean
    /**
     *    是否使用箭头进行时间选择
     */
    arrowControl?: boolean
    start?: string
    step?: string
    end?: string
}

export type FormItemConfig = BaseConfig & InputConfig & SelectConfig & TimeSelectConfig

export interface FormDefineExpose {
    /**
     * @Author: shuangqi.li
     * @Description 查询表单的绑定值
     * @param {} 无
     * @return {} 无
     */
    getFromValue: () => Object
    /**
     * @Author: shuangqi.li
     * @Description 热修改表单配置
     * @param {options} 修改的数组
     * @return {void} 无
     */
    setFormOption: (options: FormItemConfig[]) => void;
    /**
     * @Author: shuangqi.li
     * @Description
     * @param {} 无
     * @return {} 返回Promise<unknown>根据.then .catch确定是否校验通过
     */
    submitForm: () => Promise<unknown>
    /**
     * @Author: shuangqi.li
     * @Description 重置表单
     * @param {} 无
     * @return {} 无
     */
    resetForm: () => void
}
