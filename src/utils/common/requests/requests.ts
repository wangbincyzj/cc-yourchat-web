import axios from "axios"
import { ElMessage, ElMessageBox, ElNotification } from "element-plus"
import { ErrorType } from "@/@types/enums/ResponseErrorType"
import { useUserStore } from "@/store/user"

const request = axios.create({
  baseURL: process.env.VUE_APP_AXIOS_BASE_URL
})

const handleResponseError = (type: ErrorType, message: string) => {
  switch (type) {
    case ErrorType.MESSAGE:
      ElMessage.error(message)
      break
    case ErrorType.NOTIFY:
      ElNotification.error(message)
      break
    case ErrorType.DIALOG:
      ElMessageBox.alert(message)
  }
}

request.interceptors.response.use(response => {
  const reqConfig = response.config as CustomRequestConfig
  if (reqConfig.rawData) {
    return response
  }
  const data = response.data as Ret<any>
  if (data.code !== 0) {
    handleResponseError(reqConfig.errType || ErrorType.MESSAGE, data.msg)
    throw new Error(data.msg)
  }
  return response.data
}, error => {
  let message = error.message || (error.response.statusText) || (error.response.status)
  message = "网络异常: " + message
  handleResponseError(ErrorType.MESSAGE, message)
  throw error
})

let userStore

request.interceptors.request.use(config => {
  if (!userStore) {
    userStore = useUserStore()
  }
  const token = userStore?.user?.token
  if (token) {
    // @ts-ignore
    config.headers.token = token
  }
  return config
})

export const requests = {
  get: <T> (path: string, params?: Record<string, string>, config?: CustomRequestConfig): Promise<T> => {
    return request.get(path, {
      params,
      ...config as any
    })
  },

  post: <T> (path: string, data?: Record<string, any>, config?: CustomRequestConfig): Promise<T> => {
    return request.post(path, data, config as any)
  }
}
