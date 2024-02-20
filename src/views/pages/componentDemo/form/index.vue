<template>
    <div>
        <ElementFormC
            ref="formComRef"
            :formConfig="formConfig"
            :formItemConfig="formItemConfig"
            @handle="formHandle"
        >
            <template #prepend-name> 11 </template>
            <template #append-name> 22 </template>
            <template #custom-Demo="props">
                <span class="text-red-300 float-left leading-8"
                    >自定义插槽{{ props }}</span
                >
            </template>
        </ElementFormC>
        <el-button @click="getFromValue()">获取表单值</el-button>
        <el-button @click="setFormOption()">改变</el-button>
        <el-button @click="submitForm()">校验提交</el-button>
        <el-button @click="formComRef!.resetForm()">重置</el-button>
    </div>
</template>

<script lang="ts">
export default {
    auto: true,
};
</script>
<script lang="ts" setup>
import { formConfig, formItemConfig } from "./config";
import {
    FormConfig,
    FormDefineExpose,
    FormItemConfig,
} from "@/components/globalComponents/ElementFormC/form-component";

const formComRef = ref<FormDefineExpose>();
const setFormOption = () => {
    formComRef.value!.setFormOption([
        {
            key: "name1",
            value: "",
            option: [
                {
                    label: "111",
                    value: "111",
                },
                {
                    label: "222",
                    value: "222",
                },
            ],
            rule: [],
        },
    ]);
};

const submitForm = () => {
    formComRef
        .value!.submitForm()
        .then((res) => {
            console.log(res, "成功");
        })
        .catch((rej: any) => {
            console.log(rej, "失败");
            Object.keys(rej).forEach((k) => {
                rej[k].forEach((e: any) => {
                    ElMessage.warning(e.message);
                });
            });
        });
};
const getFromValue = () => {
    console.log(formComRef.value!.getFromValue());
};
const formHandle = (type: string, key: string, data: any, other: any) => {
    console.log(type, key, data, other);
};
</script>

<style scoped></style>
