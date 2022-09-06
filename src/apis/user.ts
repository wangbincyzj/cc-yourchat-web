import { requests } from "@/utils/common/requests/requests"

export const userApi = {
  login (user: Partial<User>) {
    return requests.post<Ret<User>>("/user/login", user)
  }
}
