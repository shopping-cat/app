import { gql, QueryHookOptions } from "@apollo/client"
import { ID } from "../constants/types"
import { createQueryHook } from "../lib/createApolloHook"

// QUERY/SHOP
export const SHOP = gql`
  query ($id:Int!){
    shop(id:$id) {
        id
        shopName
        shopImage
        rate
        rateNum
        itemNum
        csPhone
        kakaoLink
    }
  }
`
interface ShopData {
  shop: {
    id: ID
    shopName: string
    shopImage: string
    rate: number
    rateNum: number
    itemNum: number
    csPhone: string
    kakaoLink: string
  }
}
interface ShopVars {
  id: ID
}
export const useShop = createQueryHook<ShopData, ShopVars>(SHOP)
