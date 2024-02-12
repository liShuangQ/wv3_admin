interface BaseConfig {
    type: string
    key: string,
    label: string,
    value: any,
    rule?: any,
    col: number,
    placeholder?: string
}

interface Input extends BaseConfig {

}

interface Select extends BaseConfig {
    option: {
        value: string,
        label: string
    }[]
}

export type FormConfig = Input | Select
