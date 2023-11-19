<script lang="ts">
export default {
    auto: true
}
</script>

<script setup lang="ts">
const threeLevelCheckBox = defineAsyncComponent(() =>
    import('@/components/threeLevelCheckBox/index.vue')
)
</script>

<template>
    <div>一级</div>
    <threeLevelCheckBox></threeLevelCheckBox>
</template>