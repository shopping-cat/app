import { gql, QueryHookOptions, useApolloClient } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";

// QUERY/FILTERED_ITEMS
export const FILTERED_ITEMS = gql`
  query ($category: String, $keyword: String, $orderBy: String, $offset:Int, $limit:Int){
    filteredItems(category:$category, keyword:$keyword, orderBy:$orderBy, offset:$offset, limit:$limit) {
      id
      salePrice
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

