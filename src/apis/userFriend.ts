import { requests } from "@/utils/common/requests/requests"

export const userFriendApi = {
  addFriend (userId: string) {
    return requests.post("/userFriend/add", { userId })
  }
}
