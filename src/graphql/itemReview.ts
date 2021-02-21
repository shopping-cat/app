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
    createdAt: Date
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
  query ($createableItemReviewsOffset:Int, $createableItemReviewsLimit:Int, $myItemReviewsOffset:Int, $myItemReviewsLimit:Int){
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
    myItemReviews(offset:$myItemReviewsOffset, limit:$myItemReviewsLimit) {
        id
        createdAt
        rate
        content
        images {
            id
            uri
        }
        item {
            id
            name
        }
        order {
            id
            stringOptionNum
        }
    }
  }
`

export interface CreateableItemReview {
    id: number
    deliveryCompletionDate: Date
    stringOptionNum: string | null
    item: {
        id: number
        name: string
        mainImage: string
    }
}

export interface MyItemReview {
    id: number
    createdAt: Date
    rate: number
    content: string
    images: {
        id: number
        uri: string
    }[]
    item: {
        id: number
        name: string
    }
    order: {
        id: number
        stringOptionNum: string
    }
}

interface MyReviewsData {
    createableItemReviews: CreateableItemReview[]
    myItemReviews: MyItemReview[]
}
interface MyReviewsVars {
    createableItemReviewsOffset?: number
    createableItemReviewsLimit?: number
    myItemReviewsOffset?: number
    myItemReviewsLimit?: number
}
export const useMyReviews = (options?: QueryHookOptions<MyReviewsData, MyReviewsVars>) => createQueryHook<MyReviewsData, MyReviewsVars>(MY_REVIEWS, {
    ...options,
})


// MUTATION/ITEM_REVIEW_RECOMMEND
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

// MUTATION/CREATE_ITEM_REVIEW
export const CREATE_ITEM_REVIEW = gql`
  mutation ($orderId:Int!, $rate:Int!, $content:String!, $imageIds: [Int!]!){
    createItemReview(orderId:$orderId, rate:$rate, content:$content, imageIds:$imageIds) {
        id
    }
  }
`
interface CreateItemReviewData {
    createItemReview: {
        id: number
    }
}
interface CreateItemReviewVars {
    orderId: number
    rate: number
    content: string
    imageIds: number[]
}
export const useCreateItemReview = (options?: MutationHookOptions<CreateItemReviewData, CreateItemReviewVars>) => createMutationHook<CreateItemReviewData, CreateItemReviewVars>(CREATE_ITEM_REVIEW, {
    ...options,
    update: () => {
        //TODO
    }
})

// MUTATION/UPDATE_ITEM_REVIEW
export const UPDATE_ITEM_REVIEW = gql`
  mutation ($id:Int! $rate:Int!, $content:String!, $imageIds: [Int!]!){
    updateItemReview(id:$id, rate:$rate, content:$content, imageIds:$imageIds) {
        id
        rate
        content
        images {
            id
            uri
        }
    }
  }
`
interface UpdateItemReviewData {
    updateItemReview: {
        id: number
        rate: number
        content: string
        images: {
            id: number
            uri: string
        }[]
    }
}
interface UpdateItemReviewVars {
    id: number
    rate: number
    content: string
    imageIds: number[]
}
export const useUpdateItemReview = (options?: MutationHookOptions<UpdateItemReviewData, UpdateItemReviewVars>) => createMutationHook<UpdateItemReviewData, UpdateItemReviewVars>(UPDATE_ITEM_REVIEW, {
    ...options
})