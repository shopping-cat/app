import { gql, QueryHookOptions } from "@apollo/client"
import { ID } from "../constants/types"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"

// QUERY/CART_ITEMS 장바구니 리스트
export const CART_ITEMS = gql`
  query {
    cartItems {
        id
        userId
        itemId
    }
  }
`
interface CartItemsData {
  cartItems: {
    id: ID
    userId: ID,
    itemId: ID
  }[]
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
      userId
      itemId
    }
  }
`

interface AddToCartData {
  addToCart: {
    id: ID
    userId: ID,
    itemId: ID
  }[]
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
          const newRefs = []
          for (const cartItem of data.addToCart) {
            const ref = cache.writeFragment({
              data: cartItem,
              fragment: gql`
                fragment newCartItems on cartItems {
                  id
                }
              `
            })
            newRefs.push(ref)
          }
          console.log(newRefs)
          return [...existingRefs, ...newRefs]
        },
      }
    })
  }
})