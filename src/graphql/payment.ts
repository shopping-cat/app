import { gql, MutationHookOptions } from "@apollo/client"
import { PaymentState } from "../constants/types"
import { PAY_METHOD } from "../constants/values"
import { createMutationHook } from "../lib/createApolloHook"
import { deleteCartItemsFromCache } from "./cartItem"
import { OrderCalculateCouponVar } from "./order"

// MUTATION/CREATE_PAYMENT
export const CREATE_PAYMENT = gql`
mutation ($cartItemIds:[Int]!, $coupons:[OrderCouponArg!]!, $point: Int!, $amount:Int!, $method: String!){
    createPayment(cartItemIds:$cartItemIds, coupons:$coupons, point:$point, amount:$amount, method:$method) {
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
        }
    }
}
interface CreatePaymentVars {
    cartItemIds: number[]
    coupons: OrderCalculateCouponVar[]
    point: number
    amount: number
    method: string
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