import { requests } from "@/utils/common/requests/requests"

export const userApi = {
  login (user: Partial<User>) {
    return requests.post<Ret<User>>("/user/login", user)
  },

  getInfoByToken () {
    return requests.get<Ret<User>>("/user/info")
  },

  update (user: Partial<User>) {
    return requests.post<Ret<User>>("/user/update", user)
  }
}
