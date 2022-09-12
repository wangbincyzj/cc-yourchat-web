<script lang="ts" setup>
import { defineProps } from "vue"

const props = defineProps<{
  url: string
}>()
</script>

<template>
  <img :src="props.url" alt="">
</template>
