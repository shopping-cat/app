import { gql, QueryHookOptions } from "@apollo/client"
import { ID } from "../constants/types"
import { createQueryHook } from "../lib/createApolloHook"

// QUERY/PARTNER
export const PARTNER = gql`
  query ($id:Int!){
    partner(id:$id) {
        id
        shopName
        shopImage
        rate
        rateNum
        itemNum
    }
  }
`
interface PartnerData {
    partner: {
        id: ID
        shopName: string
        shopImage: string
        rate: number
        rateNum: number
        itemNum: number
    }
}
interface PartnerVars {
    id: ID
}
export const usePartner = (options?: QueryHookOptions<PartnerData, PartnerVars>) => createQueryHook<PartnerData, PartnerVars>(PARTNER, {
    ...options,
})
