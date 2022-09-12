<script lang="ts" setup>
import { computed, defineProps } from "vue"

const props = defineProps<{
  encodeString: string
}>()

const index = props.encodeString.lastIndexOf(".")
const extValue = index === -1 ? "" : props.encodeString.slice(index + 1)

const url = props.encodeString.split("file:")[1]

const isImage = extValue === "jpg" || extValue === "jpeg" || extValue === "jif" || extValue === "png" || extValue === "webp"
const isVideo = extValue === "mp4"
const isAudio = extValue === "mp3"

</script>

<template>
  <img v-if="isImage" :src="url" alt="">
  <video v-else-if="isVideo" :src="url" controls></video>
  <audio v-else-if="isAudio" :src="url" controls/>
  <div v-else>
    <a class="underline text-blue-600" :href="url" target="_blank">{{url}}</a>
  </div>
</template>
