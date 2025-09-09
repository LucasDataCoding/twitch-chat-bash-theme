import type { ITheme } from './themes'

export interface IConfigs {
  theme: ITheme
  name: string
  highlightText: string
  commands: string
  linkYoutube: string
  linkTwitch: string
  linkDiscord: string
  CHAT: {
    CHAT_TOKEN: string
    BOT_USERNAME: string
    CHANNEL: string
  }
}
