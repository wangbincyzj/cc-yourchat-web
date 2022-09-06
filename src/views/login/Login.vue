<script lang="ts" setup>
import { reactive, ref } from "vue"
import { userApi } from "@/apis/user"
import { useUserStore } from "@/store/user"
import { ElMessage } from "element-plus"
import { useRoute, useRouter } from "vue-router"

const loginForm = reactive({
  loginName: "",
  loginPass: ""
})
const loginFormRules = {
  loginName: [
    { required: true, message: "请输入用户名" }
  ],
  loginPass: [
    { required: true, message: "请输入密码" }
  ]
}
const loading = ref(false)

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const handleLogin = () => {
  loading.value = true
  userApi.login(loginForm).then(ret => {
    if (ret.data) {
      ElMessage.success("登录成功")
      userStore.user = ret.data
      const redirect = route.query.redirect as string || "/"
      router.replace(redirect)
    }
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div class="login">
    <div class="login-form">
      <el-row>
        <el-col :span="15">
          <div class="left" style="color: white">
            <h3>Your Chat Login</h3>
            <el-form :model="loginForm" :rules="loginFormRules" label-position="left" label-width="100px">
              <el-form-item label="用户名" prop="loginName">
                <el-input v-model="loginForm.loginName"/>
              </el-form-item>
              <el-form-item label="密码" prop="loginPass">
                <el-input type="password" v-model="loginForm.loginPass" @keydown.enter="handleLogin"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleLogin" :loading="loading">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
        <el-col :span="9">

        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-form {
  .left {
    @apply p-12 bg-[rgba(200,200,200,0.8)] text-white;
    h3 {
      @apply pl-[100px] font-bold text-xl text-blue-700 mb-4;
    }
  }

  @apply w-[800px] bg-sky-50 rounded fixed left-1/2 top-1/4 -translate-x-1/2;
  background: url("@/assets/images/login_bg.webp") center;
}
</style>
