<!---->
<!-- XXX：不同类型的表单形式，暂不考虑使用compinent is分离组件，认为存在多余变量和方法的开销，为了可维护性 下面要更加注意表单之间的代码分离-->
<!---->
<template>
    <div>
        {{ formModel }}
    </div>
    <div>
        {{ formItemConfig }}
    </div>
    <el-form
        ref="formRef"
        :model="formModel"
        :rules="formRule"
        class="demo-ruleForm"
        label-width="120px"
    >
        <!--        :gutter="20"-->
        <el-row v-for="(row, rowIndex) in formItemConfig" :key="rowIndex">
            <el-col v-for="item in row" :key="item.key" :span="item.col">
                <el-form-item :label="item.label" :prop="item.key">
                    <!--                    input-->
                    <el-input
                        v-if="item.type === 'input'"
                        v-model="formModel[item.key]"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                    />
                    <!--                    select-->
                    <el-select
                        v-if="item.type === 'select'"
                        v-model="formModel[item.key]"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请选择' + item.label
                        "
                    >
                        <el-option
                            v-for="op in item.option"
                            :key="op.value"
                            :label="op.label"
                            :value="op.value"
                        />
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from "element-plus";
import {
    FormConfig,
    FormDefineExpose,
    FormItemConfig,
} from "@/components/globalComponents/ElementFormC/form-component";

const props = withDefaults(
    defineProps<{
        formConfig: FormConfig;
        formItemConfig: FormItemConfig[][];
    }>(),
    {
        formConfig: () => {
            return {};
        },
        formItemConfig: () => {
            return [[]];
        },
    }
);
let emit = defineEmits<{
    (event: "handle", type: string, data: any): string;
}>();
const formRef = ref<FormInstance>();
const formItemConfig = ref<FormItemConfig[][]>(props.formItemConfig);
const formModel = ref<Object>({});
const formRule = ref<any>({});
formItemConfig.value.forEach((row: FormItemConfig[]) => {
    row.forEach((item: FormItemConfig) => {
        // HACK 影响setFormOption方法。此时formConfig里面的value和rule是冗余的，但是为了避免不必要的开销，暂时不动
        formModel.value[item.key] = item.value;
        formRule.value[item.key] = item?.rule ?? [];
    });
});

// ---外部调用方法---
const setFormOption = (options: FormItemConfig[]) => {
    options.forEach((item: FormItemConfig) => {
        for (let i = 0; i < formItemConfig.value.length; i++) {
            let fi = formItemConfig.value[i].findIndex(
                (formItem: FormItemConfig) => formItem.key === item.key
            );
            if (fi !== -1) {
                // HACK 根据是否单独管理的变量调整
                Object.hasOwn(item, "value") &&
                    (formModel.value[item.key] = item.value);
                Object.hasOwn(item, "rule") &&
                    (formRule.value[item.key] = item.rule);
                formItemConfig.value[i][fi] = {
                    ...formItemConfig.value[i][fi],
                    ...item,
                };
                break;
            }
        }
    });
};
const getFromValue = () => {
    return toRaw(formModel.value);
};
const submitForm = async () => {
    return new Promise(async (res, rej) => {
        await formRef.value!.validate((valid, fields) => {
            valid ? res(getFromValue()) : rej(fields);
        });
    });
};
const resetForm = () => {
    formRef.value!.resetFields();
};

defineExpose<FormDefineExpose>({
    getFromValue,
    setFormOption,
    submitForm,
    resetForm,
});
</script>
