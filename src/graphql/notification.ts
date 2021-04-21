import gql from "graphql-tag"
import { createQueryHook } from "../lib/createApolloHook"

export const NOTIFICATIONS = gql`
  query ($offset:Int, $limit:Int){
    notifications(offset:$offset, limit:$limit) {
      id
      createdAt
      image
      title
      content
      checked
      type
      params
    }
    iUser {
        id
        eventMessageAllowDate
    }
  }
`

export interface Notification {
  id: number
  createdAt: Date
  image?: string
  title: string
  content: string
  checked: boolean
  type: string
  params?: { data: any }
}

interface NotificationsData {
  iUser: {
    eventMessageAllowDate: boolean
    notificationNum: number
  }
  notifications: Notification[]
}
interface NotificationsVars {
  offset?: number
  limit?: number
}
export const useNotifications = createQueryHook<NotificationsData, NotificationsVars>(NOTIFICATIONS)