import { gql, QueryHookOptions } from "@apollo/client"
import { ID } from "../constants/types"
import { createQueryHook } from "../lib/createApolloHook"

// QUERY/ORDER_CALCULATE
export const ORDER_CALCULATE = gql`
  query ($cartItemIds:[Int]!, $couponIds:[String], $point: Int!){
    orderCalculate(cartItemIds:$cartItemIds, couponIds:$couponIds, point:$point) {
        user {
            id
            point
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
            coupon {
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
    salePrice: number | null
    salePercent: number | null
    name: string
    minItemPrice: number | null
    maxSalePrice: number | null
    period: Date
}

export interface OrderItemsCoupons {
    orderItemId: ID
    coupon: Coupon[]
}

export interface OrderCalculate {
    user: {
        id: ID
        point: number
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

interface OrderCalculateData {
    orderCalculate: OrderCalculate
}
interface OrderCalculateVars {
    cartItemIds: number[]
    couponIds: (string | null)[] | null
    point: number
}
export const useOrderCalculate = (options?: QueryHookOptions<OrderCalculateData, OrderCalculateVars>) => createQueryHook<OrderCalculateData, OrderCalculateVars>(ORDER_CALCULATE, {
    ...options,
})
