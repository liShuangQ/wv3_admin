<!---->
<!-- XXX：不同类型的表单形式，暂不考虑使用component is分离组件，认为存在多余变量和方法的开销，为了可维护性 下面要更加注意表单之间的代码分离-->
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
        :inline="formConfig.inline"
        :label-position="formConfig.labelPosition || 'right'"
        :label-width="formConfig.labelWidth || ''"
        :label-suffix="formConfig.labelSuffix || ''"
        :hide-required-asterisk="formConfig.hideRequiredAsterisk"
        :require-asterisk-position="
            formConfig.requireAsteriskPosition || 'left'
        "
        :show-message="formConfig?.showMessage ?? true"
        :inline-message="formConfig.inlineMessage"
        :status-icon="formConfig.statusIcon"
        :validate-on-rule-change="formConfig?.validateOnRuleChange ?? true"
        :size="formConfig.size"
        :disabled="formConfig.disabled"
        :scroll-to-error="formConfig.scrollToError"
        class="demo-ruleForm"
    >
        <!--        :gutter="20"-->
        <el-row v-for="(row, rowIndex) in formItemConfig" :key="rowIndex">
            <el-col v-for="item in row" :key="item.key" :span="item.col">
                <el-form-item
                    v-if="item.type !== 'custom'"
                    :label="item.label"
                    :prop="item.key"
                >
                    <!--                    input-->
                    <!-- formatter,parser 是否存在冗余性能问题？ -->
                    <el-input
                        v-if="item.type === 'input'"
                        v-model="formModel[item.key]"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                        :disabled="item.disabled"
                        :clearable="item.clearable"
                        :formatter="
                            (value:string | number) =>
                                item.formatter ? item.formatter(value) : value
                        "
                        :parser="
                            (value:string | number) =>
                                item.parser ? item.parser(value) : value
                        "
                        :showPassword="item.showPassword"
                        :suffix-icon="item.suffixIcon"
                        :prefix-icon="item.prefixIcon"
                        :type="item.textarea ? 'textarea' : 'text'"
                        :autosize="item.autosize"
                        :size="item.size || 'default'"
                        :maxlength="item.maxlength"
                        :minlength="item.minlength"
                        :show-word-limit="item.showWordLimit"
                        @change="(value:string|number)=>emit('handle','change',item.key,value,'')"
                    >
                        <template v-if="item.prepend" #prepend>
                            <slot :name="'prepend-' + item.key"></slot>
                        </template>
                        <template v-if="item.append" #append>
                            <slot :name="'append-' + item.key"></slot>
                        </template>
                    </el-input>
                    <!--                    select-->
                    <el-select
                        v-if="item.type === 'select'"
                        v-model="formModel[item.key]"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请选择' + item.label
                        "
                        :disabled="item.disabled"
                    >
                        <el-option
                            v-for="op in item.option"
                            :key="op.value"
                            :label="op.label"
                            :value="op.value"
                        />
                    </el-select>
                </el-form-item>
                <!-- 自定义 -->
                <slot v-if="item.type === 'custom-'" :name="item.key"></slot>
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
    (event: "handle", type: string, key: string, data: any, other: any): void;
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
