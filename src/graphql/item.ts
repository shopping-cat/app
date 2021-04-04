import { gql, MutationHookOptions, QueryHookOptions, useApolloClient } from "@apollo/client";
import { Category, ID, ItemState } from "../constants/types";
import { client } from "../lib/apollo";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";
import { ItemReview } from "./itemReview";
import { RECENT_SEARCH_KEYWORDS } from "./user";

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
      deliveryPrice
      extraDeliveryPrice
      reviewNum
      bestItemReviews {
        id
        createdAt
        likeNum
        rate
        content
        imageUrls
        recommendState
        item {
            id
            name
        }
        order {
            id
            stringOptionNum
        }
        user {
            id
            name
            photo
        }
      }
      shop {
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
  deliveryPrice: number
  extraDeliveryPrice: number
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
  shop: {
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
export const useItem = createQueryHook<ItemData, ItemVars>(ITEM)

// QUERY/FILTERED_ITEMS
export const FILTERED_ITEMS = gql`
  query ($category1: String,$category2: String, $keyword: String, $orderBy: String, $offset:Int, $limit:Int){
    filteredItems(category1:$category1, category2:$category2,keyword:$keyword, orderBy:$orderBy, offset:$offset, limit:$limit) {
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
    filteredItemsCount(category1:$category1, category2:$category2, keyword:$keyword)
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
  filteredItemsCount: number
}
interface FilteredItemsVars {
  category1?: string | null
  category2?: string | null
  keyword?: string
  orderBy?: string
  offset?: number
  limit?: number
}
export const useFilteredItems = createQueryHook<FilteredItemsData, FilteredItemsVars>(FILTERED_ITEMS)

export const HOME_ITEMS = gql`
  query {
    homeItems {
      type
      title
      items {
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
  }
`

export interface HomeItem {
  type: string
  title: string
  items: Item[]
}

interface HomeItemsData {
  homeItems: HomeItem[]
}
interface HomeItemsVars { }
export const useHomeItems = createQueryHook<HomeItemsData, HomeItemsVars>(HOME_ITEMS)

export const ZZIM_ITEMS = gql`
  query ($category1: String,$category2: String,$offset:Int, $limit:Int){
    zzimItems(category1:$category1, category2:$category2,offset:$offset, limit:$limit) {
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
  category1?: Category
  category2?: Category
}
export const useZzimItems = createQueryHook<ZzimItemsData, ZzimItemsVars>(ZZIM_ITEMS)

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
export const useShopItems = createQueryHook<ShopItemsData, ShopItemsVars>(SHOP_ITEMS)


export const LIKE_ITEM = gql`
  mutation ($itemId:Int!, $like:Boolean!){
    likeItem(itemId:$itemId, like:$like) {
      id
      isILiked
      likeNum
    }
  }
`

interface LikeItemData {
  likeItem: {
    id: ID
    isILiked: boolean
    likeNum: number
  }[]
}
interface LikeItemVars {
  itemId: ID
  like: boolean
}
export const useLikeItem = createMutationHook<LikeItemData, LikeItemVars>(LIKE_ITEM)


export const UNLIKE_ITEMS = gql`
  mutation ($itemIds: [Int!]!){
    unlikeItems(itemIds:$itemIds) {
      id
      isILiked
      likeNum
    }
  }
`

interface UnlikeItemsData {
  unlikeItems: {
    id: ID
    isILiked: boolean
    likeNum: number
  }
}
interface UnlikeItemsVars {
  itemIds: ID[]
}
export const useUnlikeItems = createMutationHook<UnlikeItemsData, UnlikeItemsVars>(UNLIKE_ITEMS)


