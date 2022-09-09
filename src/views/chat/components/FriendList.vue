<script lang="ts" setup>
import { userFriendApi } from "@/apis/userFriend"
import { inject, onMounted, reactive } from "vue"

const currentContext = inject<{ user: User }>("chatContext")!
console.log(currentContext)

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
  currentContext.user = user
}
onMounted(() => {
  fetchFriendList()
})
</script>

<template>
  <div class="friend-list">
    <div class="friend-item" :class="{active: currentContext.user.userId===friend.userId}"
         v-for="friend in friends.list" :key="friend.userId" @click="setActive(friend)">
      <div class="avatar">
        <img :src="friend.avatar || defaultAvatar" alt="">
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
  @apply p-1;
}

.friend-item {
  @apply flex h-[60px] border mb-0.5 duration-200 hover:border-amber-200 cursor-pointer;
  .avatar {
    @apply h-[60px] w-[60px] mr-1;
    img {
      @apply h-full w-full;
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
