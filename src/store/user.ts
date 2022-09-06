import { defineStore } from "pinia"

interface UserStore {
  user: Nullable<User>
}

export const useUserStore = defineStore<"user", UserStore, any, {
  logout: VoidFunction
}>("user", {
  state () {
    return {
      user: null
    }
  },
  actions: {
    logout () {
      this.user = null
    }
  }
})
