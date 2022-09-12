import { requests } from "@/utils/common/requests/requests"

export const fileApi = {
  upload: (file: File): Promise<Ret<string>> => {
    const form = new FormData()
    form.append("file", file)
    return requests.post("/file/upload", form)
  }
}
