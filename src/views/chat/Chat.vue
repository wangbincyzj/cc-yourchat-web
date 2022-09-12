<script setup lang="ts">
import AddFriend from "@/views/chat/components/AddFriend.vue"
import FriendList from "@/views/chat/components/FriendList.vue"
import Main from "@/views/chat/components/main/Main.vue"
import { inject, provide, reactive } from "vue"
import { Emitter } from "mitt"
import { loadFriendMessage, saveFriendMessage } from "@/views/chat/utils"

const emitter = inject("emitter") as Emitter<any>

const currentChatContext = reactive<{
  user: Nullable<User>
}>({
  user: null
})
provide("chatContext", currentChatContext)

// 保存消息应该在上层不依赖context
emitter.on("message", (msg: Message) => {
  const isCurrentMsg = currentChatContext.user && currentChatContext.user.userId && currentChatContext.user.userId === msg.to
  if (!isCurrentMsg) {
    loadFriendMessage(msg.from).then(ret => {
      ret.push(msg)
      saveFriendMessage(msg.from, ret)
    })
  }
})

</script>

<template>
  <AddFriend/>
  <div class="chat">
    <div class="friends">
      <div class="search-area">
        <el-input size="mini"/>
        <el-button>+</el-button>
      </div>
      <FriendList/>
    </div>
    <Main v-if="currentChatContext.user"/>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  @apply flex h-full overflow-hidden;
  .friends {
    @apply basis-[300px] bg-gray-200 flex-shrink-0 h-full;
    .search-area {
      @apply flex p-2 border-b;
    }
  }
}
</style>
