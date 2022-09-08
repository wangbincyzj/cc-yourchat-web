<template>
  <el-upload
    v-model:file-list="fileList"
    :action="uploadAction"
    :headers="headers"
    list-type="picture-card"
    :on-preview="handlePictureCardPreview"
    :on-success="handleSuccess"
    :limit="limit"
  >
    <el-icon>
      <Plus/>
    </el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" alt="Preview Image"/>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps, watch, reactive, onMounted } from "vue"
import { Plus } from "@element-plus/icons-vue"
import type { UploadProps, UploadUserFile } from "element-plus"
import { UploadFile, UploadFiles } from "element-plus/es/components/upload/src/upload"
import { ElMessage } from "element-plus"
import { useUserStore } from "@/store/user"

const uploadAction = process.env.VUE_APP_AXIOS_BASE_URL + "/file/upload"
const userStore = useUserStore()
const headers = reactive({
  token: userStore.user?.token
})

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  initValue: {
    type: [String, Array]
  },
  modelValue: {
    type: [String, Array],
    required: true
  },
  single: {
    type: Boolean,
    default: true
  },
  limit: {
    type: Number,
    default: 1
  }
})

const fileList = ref<UploadUserFile[]>([])

onMounted(() => {
  const value = props.initValue as any
  if (!value) {
    return
  }
  if (props.single) {
    fileList.value = [
      { url: value, name: "default" }
    ]
  } else {
    fileList.value = value.map((item, index) => ({ url: item, name: `default${index}` }))
  }
  handleChange()
})

const dialogImageUrl = ref("")
const dialogVisible = ref(false)
const handleChange = () => {
  const urls = fileList.value.map(i => i.url)
  const data = props.single ? (urls.length ? urls[0] : "") : urls
  emits("update:modelValue", data)
}
const handleSuccess: UploadProps["onSuccess"] = (response: any, uploadFile: UploadFile, uploadFiles: UploadFiles) => {
  if (response.code !== 0) {
    fileList.value.pop()
    ElMessage.error(response.msg)
  } else {
    const trueUrl = response.data
    uploadFile.url = trueUrl
  }
}

watch(() => fileList.value.length, handleChange)

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}
</script>
