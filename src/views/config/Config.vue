<script lang="ts" setup>

</script>

<template>
  <div class="config">
    <el-divider content-position="left">
      <h3>用户信息设置</h3>
    </el-divider>
    <el-row>
      <el-col :lg="{offset: 8, span: 8}" :span="24">
        <el-form label-position="left" label-width="80" size="small">
          <el-form-item label="姓名">
            <el-input/>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload/>
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
