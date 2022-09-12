<script setup lang="ts">
import AddFriend from "@/views/chat/components/AddFriend.vue"
import FriendList from "@/views/chat/components/FriendList.vue"
import Main from "@/views/chat/components/main/Main.vue"
import { inject, provide, reactive, ref } from "vue"
import { Emitter } from "mitt"
import { loadFriendMessage, saveFriendMessage } from "@/views/chat/utils"
import { useUserStore } from "@/store/user"

const userStore = useUserStore()
const emitter = inject("emitter") as Emitter<any>
const currentChatContext = reactive<{
  user: Nullable<User>
}>({
  user: null
})
const showAddFriend = ref(false)
// 保存消息应该在上层不依赖context
emitter.on("message", (msg: Message) => {
  const isCurrentMsg = currentChatContext.user && currentChatContext.user.userId && currentChatContext.user.userId === msg.to
  if (!isCurrentMsg) {
    loadFriendMessage(userStore.user.userId + msg.from).then(ret => {
      ret.push(msg)
      saveFriendMessage(userStore.user.userId + msg.from, ret)
    })
  }
})

provide("chatContext", currentChatContext)

</script>

<template>
  <AddFriend v-model="showAddFriend"/>
  <div class="chat">
    <div class="friends">
      <div class="search-area">
        <el-input size="mini"/>
        <el-button @click="showAddFriend = true">+</el-button>
      </div>
      <FriendList/>
    </div>
    <Main v-if="currentChatContext.user"/>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  @apply flex h-full  w-full;
  .friends {
    @apply basis-[300px] bg-gray-200 flex-shrink-0 h-full;
    .search-area {
      @apply flex p-2 border-b;
    }
  }
}
</style>
