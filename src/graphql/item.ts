import { gql, QueryHookOptions, useApolloClient } from "@apollo/client";
import { ID, ItemState } from "../constants/types";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { ItemReview } from "./itemReview";

// QUERY/ITEM
export const ITEM = gql`
  query ($id:Int!){
    item(id:$id) {
      id
      likeNum
      state
      name
      price
      sale
      salePrice
      option
      requireInformation
      html
      imageUrls
      isILiked
      rate
      reviewNum
      bestItemReviews {
        id
        createdAt
        likeNum
        rate
        content
        itemNameOption
        imageUrls
        recommendState
        user {
            id
            name
            photo
        }
      }
      partner {
        id
        shopName
      }
    }
  }
`
export interface ItemDetail {
  id: ID
  likeNum: number
  state: ItemState
  name: string
  price: number
  sale: number
  salePrice: number
  option?: {
    data: {
      optionGroupName: string
      optionDetails: {
        name: string
        price: number
      }[]
    }[]
  }
  requireInformation: {
    data: { title: string, content: string }[]
  }
  html: string
  imageUrls: string[]
  isILiked: boolean
  rate: number
  reviewNum: number
  bestItemReviews: ItemReview[]
  partner: {
    id: ID
    shopName: string
  }
}
interface ItemData {
  item: ItemDetail
}
interface ItemVars {
  id: ID
}
export const useItem = (options?: QueryHookOptions<ItemData, ItemVars>) => createQueryHook<ItemData, ItemVars>(ITEM, {
  ...options,
})

// QUERY/FILTERED_ITEMS
export const FILTERED_ITEMS = gql`
  query ($category: String, $keyword: String, $orderBy: String, $offset:Int, $limit:Int){
    filteredItems(category:$category, keyword:$keyword, orderBy:$orderBy, offset:$offset, limit:$limit) {
      id
      salePrice
      state
      mainImage
      name
      sale
      isFreeDelivery
      isNew
      isILiked
    }
  }
`
export interface Item {
  id: number
  salePrice: number
  state: ItemState
  mainImage: string
  name: string
  sale: number
  isFreeDelivery: boolean
  isNew: boolean
  isILiked: boolean
}
interface FilteredItemsData {
  filteredItems: Item[]
}
interface FilteredItemsVars {
  category?: string
  keyword?: string
  orderBy?: string
  offset?: number
  limit?: number
}
export const useFilteredItems = (options?: QueryHookOptions<FilteredItemsData, FilteredItemsVars>) => createQueryHook<FilteredItemsData, FilteredItemsVars>(FILTERED_ITEMS, {
  ...options,
})

export const RECOMMENDED_ITEMS = gql`
  query ($offset:Int, $limit:Int){
    recommendedItems(offset:$offset, limit:$limit) {
      id
      salePrice
      state
      mainImage
      name
      sale
      isFreeDelivery
      isNew
      isILiked
    }
  }
`

interface RecommendedItemsData {
  recommendedItems: Item[]
}
interface RecommendedItemsVars {
  offset?: number
  limit?: number
}
export const useRecommendedItems = (options?: QueryHookOptions<RecommendedItemsData, RecommendedItemsVars>) => createQueryHook<RecommendedItemsData, RecommendedItemsVars>(RECOMMENDED_ITEMS, {
  ...options,
})

export const ZZIM_ITEMS = gql`
  query ($category: String,$offset:Int, $limit:Int){
    zzimItems(category:$category,offset:$offset, limit:$limit) {
      id
      salePrice
      state
      mainImage
      name
      sale
      isFreeDelivery
      isNew
      isILiked
    }
  }
`

interface ZzimItemsData {
  zzimItems: Item[]
}
interface ZzimItemsVars {
  offset?: number
  limit?: number
  category?: string
}
export const useZzimItems = (options?: QueryHookOptions<ZzimItemsData, ZzimItemsVars>) => createQueryHook<ZzimItemsData, ZzimItemsVars>(ZZIM_ITEMS, {
  ...options,
})

export const SHOP_ITEMS = gql`
  query ($shopId: Int!, $orderBy:String $offset:Int, $limit:Int){
    shopItems(shopId:$shopId, orderBy:$orderBy, offset:$offset, limit:$limit) {
      id
      salePrice
      state
      mainImage
      name
      sale
      isFreeDelivery
      isNew
      isILiked
    }
  }
`

interface ShopItemsData {
  shopItems: Item[]
}
interface ShopItemsVars {
  shopId: ID
  orderBy?: string,
  offset?: number
  limit?: number
}
export const useShopItems = (options?: QueryHookOptions<ShopItemsData, ShopItemsVars>) => createQueryHook<ShopItemsData, ShopItemsVars>(SHOP_ITEMS, {
  ...options,
})

