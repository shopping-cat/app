import { gql, QueryHookOptions } from "@apollo/client"
import { ID } from "../constants/types"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"

// QUERY/CART_ITEMS 장바구니 리스트
export const CART_ITEMS = gql`
  query {
    cartItems {
      id
      itemId
      option
      num
      stringOption
      item {
        id
        isFreeDelivery
        mainImage
        name
        price
        salePrice
        partner {
          id
          shopName
        }
      }
    }
  }
`

export type CartItemOption = {
  data: number[]
} | null

export interface CartItem {
  id: ID
  itemId: ID
  option: CartItemOption
  num: number
  stringOption: string
  item: {
    id: ID
    isFreeDelivery: boolean
    mainImage: string
    name: string
    price: number
    salePrice: number
    partner: {
      id: ID
      shopName: string
    }
  }
}


export interface CartItemsData {
  cartItems: CartItem[]
}
interface CartItemsVars {

}
export const useCartItems = (options?: QueryHookOptions<CartItemsData, CartItemsVars>) => createQueryHook<CartItemsData, CartItemsVars>(CART_ITEMS, {
  ...options,
})

// MUTATION/ADD_TO_CART 장바구니에 담기
export const ADD_TO_CART = gql`
  mutation ($itemId:Int!, $number: Int!, $option: String) {
    addToCart(itemId:$itemId, number:$number, option:$option) {
      id
      itemId
      option
      num
      stringOption
      item {
        id
        isFreeDelivery
        mainImage
        name
        price
        salePrice
        partner {
          id
          shopName
        }
      }
    }
  }
`

interface AddToCartData {
  addToCart: CartItem
}
interface AddToCartVars {
  itemId: number
  number: number
  option: string | null
}

export const useAddToCart = () => createMutationHook<AddToCartData, AddToCartVars>(ADD_TO_CART, {
  update: (cache, { data }) => {
    cache.modify({
      fields: {
        cartItems(existingRefs = []) {
          if (!data) return [existingRefs]
          const newRefs = cache.writeFragment({
            data: data.addToCart,
            fragment: gql`
                fragment newCartItems on cartItems {
                  id
                }
              `
          })
          // 이미 있는 id가 있다면 그냥 유지
          if (existingRefs.filter((v: any) => v.__ref === newRefs?.__ref).length > 0) {
            return existingRefs
          }
          return [newRefs, ...existingRefs]
        }
      }
    })
  }
})