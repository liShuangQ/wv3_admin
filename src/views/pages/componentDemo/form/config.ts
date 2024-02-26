import {FormConfig, FormItemConfig} from "@/components/globalComponents/ElementFormC/form-component"

export let formConfig: FormConfig = {
    size: 'default',
    showMessage: true
}
export let formItemConfig: FormItemConfig[][] = [
    [
        {
            value: '',
            key: 'inputkey',
            type: 'input',
            label: 'input测试',
            rule: [
                {required: true, message: 'Please input Activity name', trigger: 'blur'},
                {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
            ],
            col: 12,
            disabled: false,
            clearable: true,
            showPassword: false,
            prepend: true,
            append: true,
            size: 'large',
            maxlength: '10',
            showWordLimit: true,
            // formatter: (value:string)=>{
            //     return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            // },
            // parser: (value:string)=>{
            //     return  value.replace(/\$\s?|(,*)/g, '')
            // },
            // suffixIcon:'Calendar',
            // prefixIcon:'Search',
            // textarea:true,
            // autosize:true,
        },
    ],
    [
        {
            col: 12,
            key: 'customkey',
            type: 'custom',
        },
    ],
    [
        {
            value: '',
            key: 'autocompletekey',
            type: 'autocomplete',
            label: 'autocomplete测试',
            suffix: true,
            clearable: true,
            valueKey: 'value'
        }
    ],
    [
        {
            value: ['1'],
            key: 'checkboxkey',
            type: 'checkbox',
            label: 'checkbox测试',
            option: [
                {value: '1', label: '1-1'},
                {value: '2', label: '2-2'},
                {value: '3', label: '3-3', disabled: true},
                {value: '4', label: '4-4'},
            ],
            min: 1, max: 2,
            button: false,
            border: true
        }
    ],
    [
        {
            value: ['2024-02-05', '2024-02-06'],
            key: 'datePickerkey',
            type: 'datePicker',
            label: 'datePicker测试',
            elem: 'daterange',
            col: 12,
            editable: true,
            unlinkPanels: false,
            disabledDate: (time: Date) => {
                return time.getTime() > Date.now()
            }
        }
    ],
    [
        {
            value: '',
            key: 'name1',
            type: 'select',
            label: '选择框测试',
            rule: [
                {
                    required: true,
                    message: 'Please select Activity zone',
                    trigger: 'change',
                },
            ],
            col: 12,
            option: [
                {
                    value: '1',
                    label: "1"
                },
                {
                    value: '2',
                    label: "2"
                },
                {
                    value: '3',
                    label: "3"
                }
            ]
        },
    ],

]