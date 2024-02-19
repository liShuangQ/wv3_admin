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
}

interface InputConfig {
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
