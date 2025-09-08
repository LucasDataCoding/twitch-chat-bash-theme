export interface IChatMessage {
  channel: string
  username: string
  message: string
  message_color: string
  timestamp?: string
  type?: string
}
