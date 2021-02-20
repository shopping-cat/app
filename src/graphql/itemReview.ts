import { gql, MutationHookOptions, QueryHookOptions } from "@apollo/client";
import { ID, RecommendState } from "../constants/types";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";


// QUERY/ITEM_REVIEWS
export const ITEM_REVIEWS = gql`
  query ($itemId: Int!, $orderBy: String!, $offset:Int, $limit:Int){
    itemReviews(itemId:$itemId, orderBy:$orderBy, offset:$offset, limit:$limit) {
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
  }
`
export interface ItemReview {
    id: ID
    createdAt: string
    likeNum: number
    rate: number
    content: string
    itemNameOption: string
    imageUrls: string[]
    recommendState: RecommendState
    user: {
        id: string
        name: string
        photo: string
    }
}

interface ItemReviewsData {
    itemReviews: ItemReview[]
}
interface ItemReviewsVars {
    itemId: ID
    orderBy: string
    offset?: number
    limit?: number
}
export const useItemReviews = (options?: QueryHookOptions<ItemReviewsData, ItemReviewsVars>) => createQueryHook<ItemReviewsData, ItemReviewsVars>(ITEM_REVIEWS, {
    ...options,
})


// QUERY/MY_REVIEWS
export const MY_REVIEWS = gql`
  query ($createableItemReviewsOffset:Int, $createableItemReviewsLimit:Int){
    createableItemReviews(offset:$createableItemReviewsOffset, limit:$createableItemReviewsLimit) {
        id
        deliveryCompletionDate
        stringOptionNum
        item {
            id
            name
            mainImage
        }
    }
  }
`

export interface CreateableItemReview {
    id: number
    deliveryCompletionDate: Date
    stringOptionNum: number
    item: {
        id: number
        name: string
        mainImage: string
        itemNameOption: string
    }
}

interface MyReviewsData {
    createableItemReviews: CreateableItemReview[]
}
interface MyReviewsVars {
    createableItemReviewsOffset?: number
    createableItemReviewsLimit?: number
}
export const useMyReviews = (options?: QueryHookOptions<MyReviewsData, MyReviewsVars>) => createQueryHook<MyReviewsData, MyReviewsVars>(MY_REVIEWS, {
    ...options,
})


// QUERY/ITEM_REVIEW_RECOMMEND
export const ITEM_REVIEW_RECOMMEND = gql`
  mutation ($itemReviewId: Int!, $recommendState:String!){
    itemReviewRecommend(itemReviewId:$itemReviewId, recommendState:$recommendState) {
        id
        likeNum
        recommendState
    }
  }
`
interface ItemReviewRecommendData {
    itemReviewRecommend: {
        id: number
        likeNum: number
        recommendState: RecommendState
    }
}
interface ItemReviewRecommendVars {
    itemReviewId: number
    recommendState: RecommendState
}
export const useItemReviewRecommend = (options?: MutationHookOptions<ItemReviewRecommendData, ItemReviewRecommendVars>) => createMutationHook<ItemReviewRecommendData, ItemReviewRecommendVars>(ITEM_REVIEW_RECOMMEND, {
    ...options,
})