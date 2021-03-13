import { gql, QueryHookOptions } from "@apollo/client"
import { ID } from "../constants/types"
import cache from "../lib/apollo/cache"
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
      optionedPrice
      optionedSaledPrice
      item {
        id
        isFreeDelivery
        mainImage
        name
        price
        salePrice
        deliveryPrice
        shop {
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
  optionedPrice: number
  optionedSaledPrice: number
  item: {
    id: ID
    isFreeDelivery: boolean
    mainImage: string
    name: string
    price: number
    salePrice: number
    deliveryPrice: number
    shop: {
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
  mutation ($itemId:Int!, $number: Int!, $option: [Int], $isDirectBuy: Boolean) {
    addToCart(itemId:$itemId, number:$number, option:$option, isDirectBuy:$isDirectBuy) {
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
        deliveryPrice
        shop {
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
  option?: number[]
  isDirectBuy?: boolean
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


// MUTATION/deleteCartItems 장바구니에서 제거
export const DELETE_CART_ITEMS = gql`
  mutation ($itemIds:[Int]!) {
    deleteCartItems(itemIds:$itemIds) 
  }
`

interface DeleteCartItemsData {
  deleteCartItems: number
}
interface DeleteCartItemsVars {
  itemIds: number[]
}

export const useDeleteCartItems = () => createMutationHook<DeleteCartItemsData, DeleteCartItemsVars>(DELETE_CART_ITEMS, {

})

export const deleteCartItemsFromCache = (ids: number[]) => {
  cache.modify({
    fields: {
      cartItems(existingRefs, { readField }) {
        return existingRefs.filter((ref: any) => !ids.includes(Number(readField('id', ref))))
      }
    }
  })
}