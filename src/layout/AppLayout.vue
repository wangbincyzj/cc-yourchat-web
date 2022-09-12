<script lang="ts" setup>
import MetaMenu from "@/layout/MetaMenu.vue"
import { useRoute, useRouter } from "vue-router"
import { computed, onMounted, watch } from "vue"
import { useUserStore } from "@/store/user"
import { setItem } from "@/utils/common/storage"
import ChatService from "@/layout/ChatService.vue"

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

userStore.$subscribe((mutation, state) => {
  setItem("user", state.user)
})

const isFullScreen = computed(() => {
  return route.meta.fullScreen
})

watch(() => userStore.user, value => {
  if (!value || !value.token) {
    userStore.logout()
    if (route.name !== "login") {
      router.push({ name: "login", query: { redirect: route.fullPath } })
    }
  }
}, { immediate: true })

onMounted(() => {
  if (userStore.user?.token) {
    userStore.updateUserInfo()
  }
})

</script>

<template>
  <ChatService>
    <div id="app">
      <div class="meta-menu" v-show="!isFullScreen">
        <MetaMenu/>
      </div>
      <div class="router-view">
        <router-view/>

      </div>

    </div>
  </ChatService>
</template>

<style lang="scss" scoped>
#app {
  display: flex;

  .meta-menu {
    @apply flex-shrink-0 basis-[80px] bg-gray-300 overflow-x-hidden;
  }

  .router-view {
    flex: 1;
    height: 100%;
  }
}
</style>
