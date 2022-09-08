<script lang="ts" setup>
import { reactive, ref } from "vue"
import { userApi } from "@/apis/user"
import { userFriendApi } from "@/apis/userFriend"

const show = ref(true)

const formData = reactive({
  userId: ""
})

const handleSearch = () => {
  // todo
}

const handleAddFriend = () => {
  userFriendApi.addFriend(formData.userId).then()
}

</script>

<template>
  <el-dialog v-model="show" title="添加好友" center>
    <el-form label-width="80px">
      <el-form-item label="用户ID">
        <el-input v-model="formData.userId">
          <template #append>
            <span @click="handleSearch">搜索</span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item >
        <el-button @click="handleAddFriend">添加</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>


