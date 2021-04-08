import gql from "graphql-tag"
import { createQueryHook } from "../lib/createApolloHook"


export const EVENT = gql`
  query ($id:Int!){
    event(id:$id){
        id
        html
    }
  }
`

interface EventData {
  event: {
    id: number
    html: string
  }
}
interface EventVars { id: number }
export const useEvent = createQueryHook<EventData, EventVars>(EVENT)

export const EVENTS = gql`
  query {
    events{
        id
        bannerImage
    }
  }
`
export interface Event {
  id: number
  bannerImage: string
}
interface EventsData {
  events: Event[]
}
interface EventsVars { }
export const useEvents = createQueryHook<EventsData, EventsVars>(EVENTS)