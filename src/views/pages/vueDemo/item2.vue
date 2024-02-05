<template>
    <div>
        <div>
            原始
            {{ props.d.config }}
        </div>
        <div>
            响应(toRefs解构)
            {{ d.config }}
        </div>
    </div>
    <div>
        <el-button size="small" type="primary" @click="dAdd()"> dAdd</el-button>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    d: { key: string; config: { name: string }[] };
}>();

let {d} = toRefs(props);
const dAdd = () => {
    d.value.config.forEach((e) => (e.name += "-"));
    // copy.value.config.push({ name: "2" });
};

const getName = () => {
    return {
        faName: toRaw(props.d.config),
        copy: toRaw(d.value.config),
    };
};
defineExpose({getName});
</script>
