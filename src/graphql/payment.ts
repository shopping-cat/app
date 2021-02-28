import { gql, MutationHookOptions } from "@apollo/client"
import { PAY_METHOD } from "../constants/values"
import { createMutationHook } from "../lib/createApolloHook"
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
