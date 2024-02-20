export interface FormConfig {

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
    size?:"large"|"small"|"default"|""
}

interface InputConfig {
    /**
     * 在 formatter的情况下显示值，我们通常同时使用 parser
     */
    formatter?:Function
    parser?:Function
    /**
     * element的 show-password 属性，得到一个可切换显示隐藏的密码框
     */
    showPassword?:boolean
    /**
     * 在输入框中（后）添加图标
     */
    suffixIcon?:string
    /**
     * 在输入框中（前）添加图标
     */
    prefixIcon?:string
    /**
     * 用于输入多行文本信息可缩放的输入框。
     */
    textarea?:boolean
    /**
     * 配合textarea，设置文字输入类型的 autosize 属性使得根据内容自动调整的高度。 你可以给 autosize 提供一个包含有最大和最小高度的对象，让输入框自动调整。
     */
    autosize?:boolean
    /**
     * 启用在输入框中前置或后置一个元素的插槽，通常是标签或按钮。:name="'prepend-' + item.key",只对非 type="textarea" 有效
     */
    prepend?:boolean
    /**
     * 启用在输入框中前置或后置一个元素的插槽，通常是标签或按钮。:name="'prepend-' + item.key",只对非 type="textarea" 有效
     */
    append?:boolean
    /**
     * 使用 maxlength 和 minlength 属性, 来控制输入内容的最大字数和最小字数。
     */
    maxlength?:string|number
    /**
     * 使用 maxlength 和 minlength 属性, 来控制输入内容的最大字数和最小字数。
     */
    minlength?:string|number
    /**
     * 允许你通过设置 show-word-limit 到 true 来显示剩余字数。
     */
    showWordLimit?:boolean
}

interface SelectConfig {
    option?: {
        value: string,
        label: string
    }[]
}

export type FormItemConfig = BaseConfig & InputConfig & SelectConfig

export interface FormDefineExpose {
    /**
     * @Author: shuangqi.li
     * @Description 查询表单的绑定值
     * @param {} 无
     * @return {} 无
     */
    getFromValue:()=> Object
    /**
     * @Author: shuangqi.li
     * @Description 热修改表单配置
     * @param {options} 修改的数组
     * @return {void} 无
     */
    setFormOption: ( options: FormItemConfig[] ) => void;
    /**
     * @Author: shuangqi.li
     * @Description
     * @param {} 无
     * @return {} 返回Promise<unknown>根据.then .catch确定是否校验通过
     */
    submitForm:  () => Promise<unknown>
    /**
     * @Author: shuangqi.li
     * @Description 重置表单
     * @param {} 无
     * @return {} 无
     */
    resetForm:  () => void
}
