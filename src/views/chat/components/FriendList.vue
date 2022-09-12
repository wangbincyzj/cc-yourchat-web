<script lang="ts" setup>
import { userFriendApi } from "@/apis/userFriend"
import { inject, onMounted, reactive, Ref } from "vue"
import { Emitter } from "mitt"

const currentContext = inject<{ user: User }>("chatContext")!
const fetchFriendList = () => {
  userFriendApi.getFriendList().then(ret => {
    friends.list = ret.data
  })
}

const defaultAvatar = "http://yourchat-1259326825.cos.ap-shanghai.myqcloud.com/1662717611503avatar.gif"

const friends = reactive<{ list: User[] }>({
  list: []
})

const setActive = (user: User) => {
  // 判断ws连接情况
  currentContext.user = user
}
onMounted(() => {
  fetchFriendList()
})

const emitter = inject<Emitter<any>>("emitter")!

emitter.on("online", uid => {
  const friend = friends.list.find(item => item.userId === uid)
  if (friend) {
    friend.online = true
  }
})
emitter.on("offline", uid => {
  const friend = friends.list.find(item => item.userId === uid)
  if (friend) {
    friend.online = false
  }
})
</script>

<template>
  <div class="friend-list">
    <div class="friend-item" :class="{'friend-item-active': currentContext.user && currentContext.user.userId===friend.userId}"
         v-for="friend in friends.list" :key="friend.userId" @click="setActive(friend)">
      <div class="avatar">
        <img :class="{offline: !friend.online}" :src="friend.avatar || defaultAvatar" alt="">
      </div>
      <div class="info">
        <span class="name">
           {{ friend.trueName || friend.loginName }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.friend-list {
}

.friend-item {
  @apply flex h-[60px] border mb-0.5 duration-200 hover:border-amber-200 cursor-pointer overflow-hidden p-2;
  &-active {
    @apply bg-gray-300;
  }
  .avatar {
    @apply h-[42px] w-[42px] mr-1;
    img {
      @apply h-full w-full;
    }
    .offline {
      filter: grayscale(100%);
    }
  }

  .info {
    @apply flex flex-col;
    .name {
      @apply text-gray-500 text-sm;
    }
  }
}
</style>
