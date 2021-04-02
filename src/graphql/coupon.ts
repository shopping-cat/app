import { gql, MutationHookOptions, QueryHookOptions } from "@apollo/client"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"

// QUERY/COUPONS
export const COUPONS = gql`
  query ($offset:Int, $limit:Int){
    coupons(offset:$offset, limit:$limit) {
        id
        image
        salePrice
        salePercent
        name
        minItemPrice
        maxSalePrice
        period
    }
  }
`
export interface Coupon {
    id: string
    image: string
    name: string
    period: Date
    salePrice: number | null
    salePercent: number | null
    minItemPrice: number | null
    maxSalePrice: number | null
}
interface CouponsData {
    coupons: Coupon[]
}
interface CouponsVars {
    offset?: number
    limit?: number
}
export const useCoupons = createQueryHook<CouponsData, CouponsVars>(COUPONS)

// MUTATION/REGIST_COUPON
export const REGIST_COUPON = gql`
  mutation ($couponId:String!){
    registCoupon(couponId:$couponId) {
        id
    }
  }
`

interface RegistCouponData {
    registCoupon: {
        id: string
    }
}
interface RegistCouponVars {
    couponId: string
}
export const useRegistCoupon = createMutationHook<RegistCouponData, RegistCouponVars>(REGIST_COUPON)