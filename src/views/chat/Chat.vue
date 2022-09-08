<template>
  <div class="chat">
    <AddFriend/>
    <div class="friends">
      <div class="search-area">
        <el-input size="mini"/>
        <el-button>+</el-button>
      </div>
    </div>
    <div class="main"></div>
  </div>
</template>


<style lang="scss" scoped>
.chat {
  @apply flex h-full overflow-hidden;
  .friends{
    @apply basis-[300px] bg-gray-100 flex-shrink-0 h-full;
    .search-area {
      @apply flex p-2 border-b;
    }
  }
  .main {
    @apply flex-1;
  }
}
</style>
<script>
import AddFriend from "@/views/chat/components/AddFriend"
export default {
  components: { AddFriend }
}
</script>
