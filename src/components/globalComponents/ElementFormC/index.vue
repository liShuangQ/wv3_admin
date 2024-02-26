<!---->
<!-- XXX：不同类型的表单形式，暂不考虑使用component is分离组件，认为存在多余变量和方法的开销，为了可维护性 下面要更加注意表单之间的代码分离-->
<!---->
<template>
    <div>
        {{ formModel }}
    </div>
    <el-form
        ref="formRef"
        :disabled="formConfig.disabled"
        :hide-required-asterisk="formConfig.hideRequiredAsterisk"
        :inline="formConfig.inline"
        :inline-message="formConfig.inlineMessage"
        :label-position="formConfig.labelPosition || 'right'"
        :label-suffix="formConfig.labelSuffix || ''"
        :label-width="formConfig.labelWidth || ''"
        :model="formModel"
        :require-asterisk-position="
            formConfig.requireAsteriskPosition || 'left'
        "
        :rules="formRule"
        :scroll-to-error="formConfig.scrollToError"
        :show-message="formConfig?.showMessage ?? true"
        :size="formConfig.size || 'default'"
        :status-icon="formConfig.statusIcon"
        :validate-on-rule-change="formConfig?.validateOnRuleChange ?? true"
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
                    <!--                    autocomplete-->
                    <el-autocomplete
                        v-if="item.type === 'autocomplete'"
                        v-model="formModel[item.key]"
                        :clearable="item.clearable"
                        :debounce="item.debounce || 300"
                        :disabled="item.disabled"
                        :fetch-suggestions="(querystring:string,cb)=>emit('handle','autocomplete',item.key,querystring,cb)"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                        :placement="item.placement || 'bottom-start'"
                        :size="item.size || formConfig.size || 'default'"
                        :value-key="item.valueKey || 'value'"
                        @select="(value:Object)=>emit('handle','select',item.key,toRaw(value),'')"
                    >
                        <template v-if="item.suffix" #suffix>
                            <slot :name="'suffix-' + item.key"></slot>
                        </template>
                        <!--                        不生效 待看-->
                        <!--                        <template v-if="item.custom" #default="{ item }">-->
                        <!--                            <slot :name="'default-' + item.key"></slot>-->
                        <!--                        </template>-->

                    </el-autocomplete>
                    <!--                    input-->
                    <!-- formatter,parser 是否存在冗余性能问题？ -->
                    <el-input
                        v-if="item.type === 'input'"
                        v-model="formModel[item.key]"
                        :autosize="(item.autosize as any) || false"
                        :clearable="item.clearable"
                        :disabled="item.disabled"
                        :formatter="
                            (value:string | number) =>
                                item.formatter ? item.formatter(value) : value
                        "
                        :maxlength="item.maxlength as any"
                        :minlength="item.minlength"
                        :parser="
                            (value:string | number) =>
                                item.parser ? item.parser(value) : value
                        "
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请输入' + item.label
                        "
                        :prefix-icon="item.prefixIcon || ''"
                        :show-word-limit="item.showWordLimit"
                        :showPassword="item.showPassword"
                        :size="item.size || formConfig.size || 'default'"
                        :suffix-icon="item.suffixIcon || ''"
                        :type="item.textarea ? 'textarea' : 'text'"
                        @change="(value:string|number)=>emit('handle','change',item.key,value,'')"
                    >
                        <template v-if="item.prepend" #prepend>
                            <slot :name="'prepend-' + item.key"></slot>
                        </template>
                        <template v-if="item.append" #append>
                            <slot :name="'append-' + item.key"></slot>
                        </template>
                    </el-input>
                    <!--                    checkbox-->
                    <el-checkbox-group
                        v-if="item.type === 'checkbox'"
                        v-model="formModel[item.key]"
                        :clearable="item.clearable"
                        :disabled="item.disabled"
                        :max="item.max"
                        :min="item.min"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请选择' + item.label
                        "
                        :size="item.size || formConfig.size || 'default'"
                        @change="(value:string|number)=>emit('handle','change',item.key,value,'')"
                    >
                        <template v-if="item.button || false">
                            <el-checkbox-button v-for="optionItem in item.option" :key="optionItem.value"
                                                :disabled="optionItem.disabled"
                                                :label="optionItem.value">
                                {{ optionItem.label }}
                            </el-checkbox-button>
                        </template>
                        <template v-else>
                            <el-checkbox v-for="optionItem in item.option" :key="optionItem.value"
                                         :border="item.border"
                                         :disabled="optionItem.disabled"
                                         :label="optionItem.value">
                                {{ optionItem.label }}
                            </el-checkbox>
                        </template>
                    </el-checkbox-group>
                    <!--                    datePicker-->
                    <el-date-picker
                        v-if="item.type === 'datePicker'"
                        v-model="formModel[item.key]"
                        :clearable="item.clearable"
                        :date-format="item.dateFormat"
                        :disabled="item.disabled"
                        :disabled-date="(time: Date)=>item.disabledDate?item.disabledDate(time):null"
                        :editable="item.editable || false"
                        :end-placeholder="item.endPlaceholder || 'end'"
                        :format="item.format"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请选择' + item.label
                        "
                        :placement="item.placement || 'bottom-start'"
                        :range-separator="item.rangeSeparator || '-'"
                        :size="item.size || formConfig.size || 'default'"
                        :start-placeholder="item.startPlaceholder || 'start'"
                        :time-format="item.timeFormat"
                        :type="item.elem || 'date'"
                        :unlink-panels="item.unlinkPanels || false"
                        :value-format="item.valueFormat || item.format"
                        @change="(value:string|number)=>emit('handle','change',item.key,value,'')"
                    >
                    </el-date-picker>
                    <!--                    timeSelect-->
                    <el-time-select
                        v-if="item.type === 'timeSelect'"
                        v-model="formModel[item.key]"
                        :clearable="item.clearable"
                        :disabled="item.disabled"
                        :end="item.end"
                        :format="(item.format as any) || 'HH:mm'"
                        :placeholder="
                        item.placeholder
                            ? item.placeholder
                            : '请选择' + item.label
                        "
                        :placement="item.placement || 'bottom-start'"
                        :size="item.size || formConfig.size || 'default'"
                        :start="item.start"
                        :step="item.step"
                        @change="(value:string|number)=>emit('handle','change',item.key,value,'')"
                    >
                    </el-time-select>
                    <!--                    select未补全-->
                    <el-select
                        v-if="item.type === 'select'"
                        v-model="formModel[item.key]"
                        :clearable="item.clearable"
                        :collapse-tags="item.collapseTags"
                        :collapse-tags-tooltip="item.collapseTagsTooltip"
                        :disabled="item.disabled"
                        :multiple="item.multiple"
                        :placeholder="
                            item.placeholder
                                ? item.placeholder
                                : '请选择' + item.label
                        "
                        :size="item.size || 'default'"
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
                <slot v-if="item.type === 'custom'" :name="'custom-' + item.key"></slot>
            </el-col>
        </el-row>
    </el-form>
</template>

<script lang="ts" setup>
import type {FormInstance} from "element-plus";
import {FormConfig, FormDefineExpose, FormItemConfig,} from "@/components/globalComponents/ElementFormC/form-component";
import {toRaw} from "vue";
import * as querystring from "querystring";

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
