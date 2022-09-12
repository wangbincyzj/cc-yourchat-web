<script setup lang="ts">
// 负责维护websocket连接和事件
import { useUserStore } from "@/store/user"
import { provide, ref, watch } from "vue"
import { ElMessage } from "element-plus"
import mitt from "mitt"
import { SysMessageType } from "@/@types/enums/SysMessageType"

const userStore = useUserStore()
const wsUrl = (process.env.VUE_APP_AXIOS_BASE_URL + "/ws").replace("http", "ws")

const ws = ref<WebSocket>()
const emitter = mitt<{
  send: { message: string, type: number, to: string, time: string | number },
  message: object,
  online: string,
  offline: string
}>()
provide("emitter", emitter)

// 处理全局的消息发送
emitter.on("send", event => {
  const wsIsAlive = ws.value && ws.value.readyState === ws.value.OPEN
  if (!wsIsAlive) {
    ElMessage.error("ws is died")
  } else {
    // 构建一个给服务器的消息
    const time = Date.now()
    event.time = time
    event.type = 0
    ws.value?.send(JSON.stringify(event))
    // 构建一个存储的消息
    const msg: Message = {
      from: "",
      to: event.to,
      message: event.message,
      time,
      type: "text"
    }
    emitter.emit("message", msg)
  }
})

watch(() => userStore.user, (value) => {
  const isOldAlive = ws.value && ws.value.OPEN
  if (isOldAlive) {
    ws.value?.close()
    ws.value = undefined
  }
  if (value && value.token) {
    const socket = new WebSocket(`${wsUrl}?token=${value.token}`)
    socket.addEventListener("open", () => {
      console.log("socket 建立连接成功")
      ElMessage.success("WebSocket连接成功")
    })
    socket.addEventListener("close", () => {
      console.log("socket 断开链接")
    })
    socket.addEventListener("message", (ev) => {
      // 接受到消息 处理为可读消息
      const serverMessage: ServerMessage = JSON.parse(ev.data)
      if (serverMessage.type === "P2P") {
        handleP2PMessage(serverMessage)
      }
      if (serverMessage.type === "S2P") {
        handleS2PMessage(serverMessage)
      }
    })
    ws.value = socket
  }
})
// 处理用户消息
const handleP2PMessage = (serverMessage: ServerMessage) => {
  const { sender, message, type, time } = serverMessage
  const sysMessage: Message = {
    from: sender.userId,
    time: time,
    message: message,
    to: "",
    type: "text"
  }
  emitter.emit("message", sysMessage)
}
// 处理系统消息
const handleS2PMessage = (serverMessage: ServerMessage) => {
  const { sysMessageType, message } = serverMessage
  if (sysMessageType === SysMessageType.FRIEND_ONLINE) {
    emitter.emit("online", serverMessage.message)
  }
  if (sysMessageType === SysMessageType.FRIEND_OFFLINE) {
    emitter.emit("offline", serverMessage.message)
  }
}
</script>

<template>
  <slot></slot>
</template>
