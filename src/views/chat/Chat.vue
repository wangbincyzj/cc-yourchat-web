<script setup lang="ts">
import AddFriend from "@/views/chat/components/AddFriend.vue"
import FriendList from "@/views/chat/components/FriendList.vue"
import { provide, reactive, watch } from "vue"

const currentChatContext = reactive<{
  user: Nullable<User>
}>({
  user: null
})

provide("chatContext", currentChatContext)

watch(() => currentChatContext.user, value => {
  console.log("context change:", value)
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
    <div class="main">
      <div class="window"></div>
      <div class="toolbar"></div>
      <div class="input">
        <textarea/>
        <div class="send">
          <el-button size="small">send</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat {
  @apply flex h-full overflow-hidden;
  .friends {
    @apply basis-[300px] bg-gray-100 flex-shrink-0 h-full;
    .search-area {
      @apply flex p-2 border-b;
    }
  }

  .main {
    @apply flex-1 flex flex-col;
    .window {
      @apply flex-1;
    }

    .toolbar {
      @apply bg-gray-50 h-[30px];
    }

    .input {
      @apply h-[300px] flex flex-col;
      textarea {
        @apply flex-1;
      }

      .send {
        @apply h-[30px] flex justify-end bg-gray-50 items-center px-2;
      }
    }
  }
}
</style>

