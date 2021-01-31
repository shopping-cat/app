import { ID, RecommendState } from "../constants/types";

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