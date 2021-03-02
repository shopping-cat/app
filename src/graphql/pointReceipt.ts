import { gql, QueryHookOptions } from "@apollo/client"
import { createQueryHook } from "../lib/createApolloHook"

// QUERY/POINT_RECEIPTS
export const POINT_RECEIPTS = gql`
  query ($offset:Int, $limit:Int){
    pointReceipts(offset:$offset, limit:$limit) {
        id
        createdAt
        name
        point
    }
    iUser {
        id
        point
    }
  }
`
export interface PointReceipt {
    id: number
    createdAt: Date
    name: string
    point: number
}
interface PointReceiptsData {
    pointReceipts: PointReceipt[]
    iUser: {
        id: string
        point: number
    }
}
interface PointReceiptsVars {
    offset?: number
    limit?: number
}
export const usePointReceipts = (options?: QueryHookOptions<PointReceiptsData, PointReceiptsVars>) => createQueryHook<PointReceiptsData, PointReceiptsVars>(POINT_RECEIPTS, {
    ...options,
})