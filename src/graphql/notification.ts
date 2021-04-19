import gql from "graphql-tag"
import { createQueryHook } from "../lib/createApolloHook"

export const NOTIFICATIONS = gql`
  query ($offset:Int, $limit:Int){
    iUser {
        id
        eventMessageAllow
    }
    notifications(offset:$offset, limit:$limit) {
      id
      createdAt
      image
      title
      content
      type
      params
    }
  }
`

export interface Notification {
    id: number
    createdAt: Date
    image?: string
    title: string
    content: string
    type: string
    params?: { data: any }
}

interface NotificationsData {
    iUser: {
        eventMessageAllow: boolean
    }
    notifications: Notification[]
}
interface NotificationsVars {
    offset?: number
    limit?: number
}
export const useNotifications = createQueryHook<NotificationsData, NotificationsVars>(NOTIFICATIONS)