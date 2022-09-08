<script setup lang="ts">
import { useUserStore } from "@/store/user"
import { computed, ComputedRef } from "vue"
import { useRouter } from "vue-router"
import { ChatLineSquare } from "@element-plus/icons-vue"

const userStore = useUserStore()
const router = useRouter()

const avatarSrc = computed(() => {
  return userStore.user?.avatar || require("@/assets/images/avatar.gif")
})

const user = computed(() => {
  return userStore.user ? userStore.user : {}
}) as unknown as ComputedRef<User>

const goConfig = () => {
  router.push({ name: "config" })
}

const goChat = () => {
  router.push({ name: "chat" })
}

const handleLogout = () => {
  userStore.logout()
}
</script>

<template>
  <div class="meta-menu">
    <div class="avatar menu-item" @click="goConfig">
      <el-popover>
        <template #default>
          <el-descriptions size="small" :column="1">
            <el-descriptions-item label="账号">{{ user.loginName }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ user.trueName }}</el-descriptions-item>
            <el-descriptions-item>
              <el-button type="text" @click="handleLogout">注销</el-button>
            </el-descriptions-item>
          </el-descriptions>
        </template>
        <template #reference>
          <el-avatar shape="square" :src="avatarSrc" :size="48"/>
        </template>
      </el-popover>
    </div>
    <div class="menu-item" @click="goChat">
      <el-icon><ChatLineSquare /></el-icon>
    </div>

  </div>
</template>

<style scoped lang="scss">
.meta-menu {
  @apply w-full h-full p-4 flex flex-col overflow-x-hidden;
  .menu-item {
    @apply w-[48px] h-[48px] cursor-pointer hover:shadow-fuchsia-500 duration-200 mt-4 flex justify-center items-center bg-amber-50 rounded-full;
    &:hover {
      box-shadow: 0 0 4px deepskyblue;
    }
  }
}
</style>
