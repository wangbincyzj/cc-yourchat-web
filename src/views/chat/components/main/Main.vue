<script setup lang="ts">
import { inject, nextTick, ref, watch } from "vue"
import { Emitter } from "mitt"
import { getItem, setItem } from "@/utils/common/storage"
import { useUserStore } from "@/store/user"
import { loadFriendMessage, saveFriendMessage } from "@/views/chat/utils"

const userStore = useUserStore()
const emitter = inject("emitter") as Emitter<any>
const currentChatContext = inject<{ user: User }>("chatContext")!
const text = ref("")
const window = ref<HTMLDivElement>()
const msgList = ref<Message[]>([])

const constructP2PMessage = (message: string, to: string) => {
  return {
    type: 0,
    to,
    message
  }
}
emitter.on("message", (msg: Message) => {
  // 是否是当前的用户
  const isCurrentMessage = msg.from === currentChatContext.user.userId || msg.to === currentChatContext.user.userId
  if (isCurrentMessage) {
    msgList.value.push(msg)
    scrollToLatestMessage()
  }
})
const sendP2PMessage = () => {
  if (!text.value) {
    return
  }
  emitter.emit("send", constructP2PMessage(text.value, currentChatContext.user.userId))
  text.value = ""
}

const scrollToLatestMessage = () => {
  nextTick(() => {
    if (window.value) {
      window.value.scrollTo({ top: window.value?.scrollHeight })
    }
  })
}

// 监听聊天对象改变
watch(() => currentChatContext.user, user => {
  if (user && user.userId) {
    loadFriendMessage(user.userId).then(msgs => {
      console.log(msgs)
      msgList.value = msgs
    }).finally(scrollToLatestMessage)
  }
}, { immediate: true })
// 监听消息持久化
watch(() => msgList, list => {
  saveFriendMessage(currentChatContext.user.userId, list.value)
}, { deep: true })

</script>

<template>
  <div class="main">
    <div class="window" ref="window">
      <div class="message-item" :class="{[i.from ? 'message-item-from': 'message-item-to']: true}" v-for="i in msgList"
           :key="i.time">
        <img :src="i.from ? currentChatContext.user.avatar: userStore.user.avatar" alt="" class="avatar">
        <p class="content">{{ i.message }}</p>
      </div>
    </div>
    <div class="toolbar"></div>
    <div class="input">
      <textarea v-model="text" @keydown.enter.prevent="sendP2PMessage"/>
      <div class="send">
        <el-button size="small" @click="sendP2PMessage">send</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply flex-1 flex flex-col bg-gray-100;
  .window {
    @apply flex-1 px-8 py-4 overflow-auto;
    .message-item {
      &-from {
        @apply flex mt-4 pr-[30%];

        .avatar {
          @apply h-[35px] w-[35px];
        }

        .content {
          @apply bg-white ml-4 rounded-xl p-2 -mt-1 whitespace-pre;
        }
      }

      &-to {
        @apply flex mt-4 pl-[30%] flex-row-reverse;

        .avatar {
          @apply h-[35px] w-[35px];
        }

        .content {
          @apply bg-white mr-4 rounded-xl p-2 -mt-1 whitespace-pre bg-green-400;
        }
      }
    }
  }

  .toolbar {
    @apply bg-gray-50 h-[30px];
  }

  .input {
    @apply h-[300px] flex flex-col;
    textarea {
      @apply flex-1 text-gray-600 pl-4 pr-2 pt-2 tracking-wide;
      &:focus-visible {
        @apply outline-0;
      }
    }

    .send {
      @apply h-[30px] flex justify-end bg-gray-50 items-center px-2;
    }
  }
}

</style>
