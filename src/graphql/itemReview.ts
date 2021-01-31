import { gql, QueryHookOptions } from "@apollo/client";
import { ID, RecommendState } from "../constants/types";
import { createQueryHook } from "../lib/createApolloHook";


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