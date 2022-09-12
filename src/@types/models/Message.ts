import { SysMessageType } from "@/@types/enums/SysMessageType"

declare global {
  interface Message {
    from: string
    to: string
    message: string
    type: string
    time: number | string
  }

  interface ServerMessage {
    type: string
    time: number
    message: string
    sender: User
    sysMessageType: SysMessageType
  }
}
