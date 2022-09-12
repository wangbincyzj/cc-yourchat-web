<script setup lang="ts">
import { computed, inject, nextTick, ref, watch } from "vue"
import { Emitter } from "mitt"
import { useUserStore } from "@/store/user"
import { loadFriendMessage, saveFriendMessage } from "@/views/chat/utils"
import { Files } from "@element-plus/icons-vue"
import { fileApi } from "@/apis/file"
import FileType from "@/views/chat/components/file-type/FileType.vue"

const userStore = useUserStore()
const emitter = inject("emitter") as Emitter<any>
const currentChatContext = inject<{ user: User }>("chatContext")!
const text = ref("")
const window = ref<HTMLDivElement>()
const msgList = ref<Message[]>([])
const loading = ref(false)
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
const sendImageMessage = () => {
  const input: HTMLInputElement = document.createElement("input")
  input.onchange = () => {
    const file = input.files![0]
    fileApi.upload(file).then(ret => {
      text.value = `file:${ret.data}`
      sendP2PMessage()
    })
  }
  input.type = "file"
  input.click()
}

const scrollToLatestMessage = () => {
  nextTick(() => {
    if (window.value) {
      window.value.scrollTo({ top: window.value?.scrollHeight })
    }
  })
}

const placeHolder = computed(() => {
  const isCurrentUserOnline = currentChatContext.user.online
  return isCurrentUserOnline ? "" : "当前用户不在线 可能收不到消息"
})

// 监听聊天对象改变
watch(() => currentChatContext.user, user => {
  if (user && user.userId) {
    loadFriendMessage(userStore.user.userId + user.userId).then(msgs => {
      msgList.value = msgs
    }).finally(scrollToLatestMessage)
  }
}, { immediate: true })
// 监听消息持久化
watch(() => msgList, list => {
  saveFriendMessage(userStore.user.userId + currentChatContext.user.userId, list.value)
}, { deep: true })

</script>

<template>
  <div class="main">
    <div class="window" ref="window">
      <div class="message-item" :class="{[i.from ? 'message-item-from': 'message-item-to']: true}" v-for="i in msgList"
           :key="i.time">
        <img :src="i.from ? currentChatContext.user.avatar: userStore.user.avatar" alt="" class="avatar">
        <div class="content">
          <FileType :encode-string="i.message" v-if="i.message.startsWith('file:')"/>
          <template v-else>{{ i.message }}</template>
        </div>
      </div>
    </div>
    <div class="toolbar">
      <el-icon class="cursor-pointer" @click="sendImageMessage">
        <Files/>
      </el-icon>
    </div>
    <div class="input">
      <textarea :placeholder="placeHolder" v-model="text" @keydown.enter.prevent="sendP2PMessage"/>
      <div class="send">
        <el-button size="small" @click="sendP2PMessage">send</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  @apply flex-1 flex flex-col bg-gray-100 w-full overflow-hidden;
  .window {
    @apply flex-1 px-8 py-4 overflow-auto;
    .message-item {
      @apply w-full;
      .content {
        @apply max-w-full overflow-hidden break-all;
      }
      &-from {
        @apply flex mt-4 pr-[30%];

        .avatar {
          @apply h-[35px] w-[35px];
        }

        .content {
          @apply bg-white ml-4 rounded-xl p-2 -mt-1 whitespace-pre-line;
        }
      }

      &-to {
        @apply flex mt-4 pl-[30%] flex-row-reverse;

        .avatar {
          @apply h-[35px] w-[35px];
        }

        .content {
          @apply bg-white mr-4 rounded-xl p-2 -mt-1  bg-green-400;
        }
      }
    }
  }

  .toolbar {
    @apply bg-gray-50 h-[30px] flex justify-end items-center px-2;
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
