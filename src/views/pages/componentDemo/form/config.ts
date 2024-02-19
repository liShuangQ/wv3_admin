import { FormItemConfig } from "@/components/globalComponents/ElementFormC/form-component"

export let formConfig = {}
export let formItemConfig: FormItemConfig[][] = [
    [
        {
            value: '',
            key: 'name',
            type: 'input',
            label: '输入框测试',
            rule: [
                {required: true, message: 'Please input Activity name', trigger: 'blur'},
                {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'},
            ],
            col: 12
        },
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