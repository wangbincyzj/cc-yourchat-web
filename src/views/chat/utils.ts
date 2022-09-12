import { getItem, setItem } from "@/utils/common/storage"

export const loadFriendMessage = async (userId: string): Promise<Message[]> => {
  const messages = getItem<Message[]>(`message-${userId}`) || []
  // 只加载20条以内
  return messages.length > 30 ? messages.slice(messages.length - 30) : messages
}
export const saveFriendMessage = async (userId: string, list) => {
  const key = `message-${userId}`
  setItem(key, list)
}
