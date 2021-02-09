import { gql, QueryHookOptions } from "@apollo/client"
import { ID } from "../constants/types"
import { createQueryHook } from "../lib/createApolloHook"

// QUERY/ORDER_CALCULATE
export const ORDER_CALCULATE = gql`
query ($cartItemIds:[Int]!, $coupons:[OrderCouponArg!]!, $point: Int!){
    orderCalculate(cartItemIds:$cartItemIds, coupons:$coupons, point:$point) {
        user {
            id
            point
            couponNum
            deliveryInfo {
                id
                name
                phone
                address
                addressDetail
            }
            refundBankAccount {
                id
                bankName
                ownerName
                accountNumber
            }
        }
        orderItems {
            id
            stringOption
            num
            optionedPrice
            optionedSaledPrice
            item {
                id
                name
                mainImage
                price
                salePrice
                isFreeDelivery
                partner {
                id
                shopName
                }
            }
        }
        orderItemsCoupons {
            orderItemId
            coupons {
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
        totalItemPrice
        totalSaledPrice
        totalCouponedPrice
        totalDeliveryPrice
        totalExtraDeliveryPrice
        totalSale
        totalCouponSale
        totalPointSale
        totalPaymentPrice
        maxPointPrice
    }
  }
`

export interface OrderItem {
    id: ID
    stringOption: string | null
    num: number
    optionedPrice: number
    optionedSaledPrice: number
    item: {
        id: ID
        name: string
        mainImage: string
        price: number
        salePrice: number
        isFreeDelivery: boolean
        partner: {
            id: ID
            shopName: string
        }
    }
}

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

export interface OrderItemsCoupons {
    orderItemId: ID
    coupons: Coupon[]
}

export interface OrderCalculate {
    user: {
        id: ID
        point: number
        couponNum: number
        deliveryInfo: {
            id: number
            name: string
            phone: string
            address: string
            addressDetail: string
        } | null
        refundBankAccount: {
            id: number
            bankName: string
            ownerName: string
            accountNumber: string
        } | null
    }
    orderItems: OrderItem[]
    orderItemsCoupons: OrderItemsCoupons[]
    totalItemPrice: number
    totalSaledPrice: number
    totalCouponedPrice: number
    totalDeliveryPrice: number
    totalExtraDeliveryPrice: number
    totalSale: number
    totalCouponSale: number
    totalPointSale: number
    totalPaymentPrice: number
    maxPointPrice: number
}

export interface OrderCalculateCouponVar {
    orderItemId: number
    couponId: string
}

interface OrderCalculateData {
    orderCalculate: OrderCalculate
}
interface OrderCalculateVars {
    cartItemIds: number[]
    coupons: OrderCalculateCouponVar[]
    point: number
}
export const useOrderCalculate = (options?: QueryHookOptions<OrderCalculateData, OrderCalculateVars>) => createQueryHook<OrderCalculateData, OrderCalculateVars>(ORDER_CALCULATE, {
    ...options,
})
