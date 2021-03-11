import { gql, MutationHookOptions, QueryHookOptions } from "@apollo/client"
import { OrderState, PaymentState } from "../constants/types"
import { PAY_METHOD } from "../constants/values"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"
import { deleteCartItemsFromCache } from "./cartItem"
import { OrderCalculateCouponVar } from "./order"


// QUERY/PAYMENT
export const PAYMENT = gql`
query ($id:String!){
    payment(id:$id) {
        id
        state
        cancelReason
        paymentMethod
        price
        deliveryPrice
        extraDeliveryPrice
        itemSale
        couponSale
        pointSale
        totalPrice
        address
        addressName
        addressPhone
        deliveryMemo
        orders {
            id
            state
            totalPrice
            stringOptionNum
            item {
                id
                mainImage
                name
            }
        }
    }
  }
`

export interface PaymentDetailOrder {
    id: number
    state: OrderState
    totalPrice: number
    stringOptionNum: string
    item: {
        id: number
        mainImage: string
        name: string
    }
}

export interface PaymentDetail {
    id: string
    state: PaymentState
    cancelReason: string | null
    paymentMethod: string
    price: number
    deliveryPrice: number
    extraDeliveryPrice: number
    itemSale: number
    couponSale: number
    pointSale: number
    totalPrice: number
    address: string
    addressName: string
    addressPhone: string
    deliveryMemo: string
    orders: PaymentDetailOrder[]
}

interface PaymentData {
    payment: PaymentDetail
}
interface PaymentVars {
    id: string
}
export const usePayment = (options?: QueryHookOptions<PaymentData, PaymentVars>) => createQueryHook<PaymentData, PaymentVars>(PAYMENT, {
    ...options,
})


// QUERY/PAYMENTS
export const PAYMENTS = gql`
query ($offset:Int, $limit:Int){
    payments(offset:$offset, limit:$limit) {
        id
        createdAt
        name
        state
    }
  }
`

export interface Payment {
    id: string
    createAt: Date
    name: string
    state: PaymentState
}

interface PaymentsData {
    payments: Payment[]
}
interface PaymentsVars {
    offset: number
    limit: number
}
export const usePayments = (options?: QueryHookOptions<PaymentsData, PaymentsVars>) => createQueryHook<PaymentsData, PaymentsVars>(PAYMENTS, {
    ...options,
})


// MUTATION/CREATE_PAYMENT
export const CREATE_PAYMENT = gql`
mutation ($cartItemIds:[Int]!, $coupons:[OrderCouponArg!]!, $point: Int!, $amount:Int!, $method: String!, $deliveryMemo: String!){
    createPayment(cartItemIds:$cartItemIds, coupons:$coupons, point:$point, amount:$amount, method:$method, deliveryMemo:$deliveryMemo) {
        id
        totalPrice
        name
        postCode
        address
        paymentMethod
        user {
            name
            userDetail {
                email
            }
            certificatedInfo {
                id
                name
                phone
            }
        } 
    }
  }
`

interface CreatePaymentData {
    createPayment: {
        id: string
        totalPrice: number
        name: string
        postCode: string
        address: string
        paymentMethod: PAY_METHOD
        user: {
            name: string
            userDetail: {
                email: string | null
            }
            certificatedInfo: {
                id: number
                name: string
                phone: string
            }
        }
    }
}
interface CreatePaymentVars {
    cartItemIds: number[]
    coupons: OrderCalculateCouponVar[]
    point: number
    amount: number
    method: string
    deliveryMemo: string
}
export const useCreatePayment = (options?: MutationHookOptions<CreatePaymentData, CreatePaymentVars>) => createMutationHook<CreatePaymentData, CreatePaymentVars>(CREATE_PAYMENT, {
    ...options,
})


// MUTATION/COMPLETE_PAYMENT
export const COMPLETE_PAYMENT = gql`
mutation ($imp_uid:String!, $merchant_uid:String!){
    completePayment(imp_uid:$imp_uid, merchant_uid:$merchant_uid) {
        id
        name
        state
        cancelReason
        address
        addressName
        addressPhone
        deliveryMemo
        vBankNum
        vBankDate
        vBankName
        totalPrice
        paymentMethod
        orders {
            id
            stringOptionNum
            cartItemId
            item {
                id
                name
                mainImage
            }
        }
    }
  }
`

export interface CompletePayment {
    id: string
    name: string
    state: PaymentState
    cancelReason: string | null
    address: string
    addressName: string
    addressPhone: string
    deliveryMemo: string
    vBankNum: string | null
    vBankDate: string | null
    vBankName: string | null
    totalPrice: number
    paymentMethod: string
    orders: {
        id: number
        stringOptionNum: string
        cartItemId: number
        item: {
            id: number
            name: string
            mainImage: string
        }
    }[]
}

interface CompletePaymentData {
    completePayment: CompletePayment
}
interface CompletePaymentVars {
    imp_uid: string
    merchant_uid: string
}
export const useCompletePayment = (options?: MutationHookOptions<CompletePaymentData, CompletePaymentVars>) => createMutationHook<CompletePaymentData, CompletePaymentVars>(COMPLETE_PAYMENT, {
    ...options,
    onCompleted: ({ completePayment }) => {
        if (completePayment.state !== '결제취소') deleteCartItemsFromCache(completePayment.orders.map(v => v.cartItemId))
    }
})


// MUTATION/CANCEL_PAYMENT
export const CANCEL_PAYMENT = gql`
mutation ($id:String!){
    cancelPayment(id:$id) {
        id
        state
        cancelReason
        orders {
            id
            state
        }
    }
  }
`


interface CancelPaymentData {
    cancelPayment: {
        id: string
        state: PaymentState
        cancelReason: string | null
        orders: {
            id: number
            state: OrderState
        }[]
    }
}
interface CancelPaymentVars {
    id: string
}
export const useCancelPayment = (options?: MutationHookOptions<CancelPaymentData, CancelPaymentVars>) => createMutationHook<CancelPaymentData, CancelPaymentVars>(CANCEL_PAYMENT, {
    ...options
})