import { defineStore } from "pinia"
import { getItem } from "@/utils/common/storage"

interface UserStore {
  user: Nullable<User>
}

export const useUserStore = defineStore<"user", UserStore, any, {
  logout: VoidFunction
}>("user", {
  state () {
    return {
      user: getItem("user")
    }
  },
  actions: {
    logout () {
      this.user = null
    }
  }
})
