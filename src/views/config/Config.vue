<script lang="ts" setup>
import { useUserStore } from "@/store/user"
import WUpload from "@/components/w-upload/WUpload.vue"
import { reactive } from "vue"
import { userApi } from "@/apis/user"
import { ElMessage } from "element-plus"

const userStore = useUserStore()
const user = userStore.user

const updateForm = reactive({
  avatar: user.avatar,
  trueName: user.trueName,
  id: user.id
})
const handleSubmit = () => {
  userApi.update(updateForm).then(() => {
    ElMessage.success("修改成功")
    userStore.updateUserInfo()
  })
}
</script>

<template>
  <div class="config">
    <el-divider content-position="left">
      <h3>用户信息设置</h3>
    </el-divider>
    <el-row>
      <el-col :lg="{offset: 8, span: 8}" :span="24">
        <el-form label-position="right" label-width="40px" size="small">
          <el-form-item label="账号" prop="loginName">
            <el-input disabled :model-value="user?.loginName"/>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="updateForm.trueName"/>
          </el-form-item>
          <el-form-item label="头像">
            <WUpload v-model="updateForm.avatar" :initValue="user.avatar"/>
          </el-form-item>
          <el-form-item >
            <el-button size="small" @click="handleSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-divider content-position="left">
      <h3>系统设置</h3>
    </el-divider>
    <el-row>
      <el-col :lg="{offset: 8, span: 8}" :span="24">
        <el-form label-position="left" label-width="80" size="small">
          <el-form-item label="保存信息到云端">
            <el-checkbox disabled/>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.config {
  @apply p-4;
}
</style>
