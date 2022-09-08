import { defineStore } from "pinia"
import { getItem } from "@/utils/common/storage"
import { userApi } from "@/apis/user"

interface UserStore {
  user: User
}

export const useUserStore = defineStore<"user", UserStore, any, {
  logout: VoidFunction,
  updateUserInfo: VoidFunction,
}>("user", {
  state () {
    return {
      user: getItem("user") || {} as User
    }
  },
  actions: {
    logout () {
      this.user = {} as User
    },
    updateUserInfo () {
      userApi.getInfoByToken().then(ret => {
        console.log(ret)
        if (ret.code !== 0) {
          this.logout()
        } else {
          this.user = {
            ...ret.data,
            token: this.user!.token
          }
        }
      })
    }
  }
})
