<template>
  <h1>{{ text }}</h1>
  <button @click="add">+</button>
</template>
<script lang="ts" setup>
import { ref } from "vue";
const text = ref<string>("+");
const add = () => {
  text.value += "+";
};
</script>
