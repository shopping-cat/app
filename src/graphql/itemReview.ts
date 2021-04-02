import { gql, MutationHookOptions, QueryHookOptions } from "@apollo/client";
import { ID, RecommendState } from "../constants/types";
import { client } from "../lib/apollo";
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
  }
`
export interface ItemReview {
    id: ID
    createdAt: Date
    likeNum: number
    rate: number
    content: string
    imageUrls: string[]
    recommendState: RecommendState
    item: {
        id: number
        name: string
    }
    order: {
        id: number
        stringOptionNum: string | null
    }
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
export const useItemReviews = createQueryHook<ItemReviewsData, ItemReviewsVars>(ITEM_REVIEWS)


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
export const useMyReviews = createQueryHook<MyReviewsData, MyReviewsVars>(MY_REVIEWS)


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
export const useItemReviewRecommend = createMutationHook<ItemReviewRecommendData, ItemReviewRecommendVars>(ITEM_REVIEW_RECOMMEND)

// MUTATION/CREATE_ITEM_REVIEW
export const CREATE_ITEM_REVIEW = gql`
  mutation ($orderId:Int!, $rate:Int!, $content:String!, $imageIds: [Int!]!){
    createItemReview(orderId:$orderId, rate:$rate, content:$content, imageIds:$imageIds) {
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
interface CreateItemReviewData {
    createItemReview: MyItemReview
}
interface CreateItemReviewVars {
    orderId: number
    rate: number
    content: string
    imageIds: number[]
}
export const useCreateItemReview = createMutationHook<CreateItemReviewData, CreateItemReviewVars>(CREATE_ITEM_REVIEW, {
    update: (cache, { data }) => {
        cache.modify({
            fields: {
                myItemReviews(existingRefs = []) {
                    if (!data) return [existingRefs]
                    const newRefs = cache.writeFragment({
                        data: data.createItemReview,
                        fragment: gql`
                            fragment newItemReview on itemReview {
                                id
                            }
                        `
                    })
                    // 이미 있는 id가 있다면 그냥 유지
                    if (existingRefs.filter((v: any) => v.__ref === newRefs?.__ref).length > 0) {
                        return existingRefs
                    }
                    return [newRefs, ...existingRefs]
                },
                createableItemReviews(existingRefs, { readField }) {
                    return existingRefs.filter((ref: any) => data?.createItemReview.order.id !== (Number(readField('id', ref))))
                }
            }
        })
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
export const useUpdateItemReview = createMutationHook<UpdateItemReviewData, UpdateItemReviewVars>(UPDATE_ITEM_REVIEW)