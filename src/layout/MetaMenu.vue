<script setup lang="ts">
import { useUserStore } from "@/store/user"
import { computed } from "vue"
import { useRouter } from "vue-router"

const userStore = useUserStore()
const router = useRouter()

const avatarSrc = computed(() => {
  return userStore.user?.avatar || require("@/assets/images/avatar.gif")
})

const goConfig = () => {
  router.push({ name: "config" })
}

</script>

<template>
  <div class="meta-menu">
    <div class="avatar menu-item" @click="goConfig">
      <el-avatar shape="square" :src="avatarSrc" :size="48"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.meta-menu {
  @apply w-full h-full p-4 flex flex-col overflow-x-hidden;
  .menu-item {
    @apply w-[48px] h-[48px] cursor-pointer hover:shadow-fuchsia-500 duration-200;
    &:hover {
      box-shadow: 0 0 4px deepskyblue;
    }
  }
}
</style>
