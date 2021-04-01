import { gql, QueryHookOptions } from "@apollo/client"
import { ID } from "../constants/types"
import { createMutationHookTest, createQueryHook, createQueryHookTest } from "../lib/createApolloHook"

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
            certificatedInfo {
                id
                name
                phone
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
                shop {
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
        shop: {
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
            address: string
            addressDetail: string
            phone: string
        } | null
        refundBankAccount: {
            id: number
            bankName: string
            ownerName: string
            accountNumber: string
        } | null
        certificatedInfo: {
            id: number
            name: string
            phone: string
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

const ORDER = gql`
query ($id:Int!) {
    order (id:$id) {
        id
        stringOptionNum
        totalPrice
        reason
        reasonDetail
        refundPrice
        refundPoint
        refundMethod
        expectationRefundPrice
        expectationRefundPoint
        expectationRefundMethod
        item {
            id
            name
            mainImage
            shop {
                id
                refundInfo
                exchangeInfo
            }
        }
    }
}
`

interface OrderData {
    order: {
        id: number
        stringOptionNum: string
        totalPrice: number
        reason: string
        reasonDetail: string
        refundPrice: number
        refundPoint: number
        refundMethod: string
        expectationRefundPrice: number
        expectationRefundPoint: number
        expectationRefundMethod: number
        item: {
            id: number
            name: string
            mainImage: string
            shop: {
                id: number
                refundInfo: string
                exchangeInfo: string
            }
        }
    }
}
interface OrderVars {
    id: number
}
export const useOrder = createQueryHookTest<OrderData, OrderVars>(ORDER)

const REFUND_ORDER = gql`
mutation ($input:RefundOrderInput!) {
    refundOrder (input:$input) {
        id
        state
        reason
        reasonDetail
    }
}
`
interface RefundOrderData { }
interface RefundOrderVars {
    input: {
        id: number
        reason: string
        reasonDetail: string
    }
}
export const useRefundOrder = createMutationHookTest<RefundOrderData, RefundOrderVars>(REFUND_ORDER)