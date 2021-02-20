import { gql, MutationHookOptions } from "@apollo/client"
import { ReactNativeFile } from "apollo-upload-client"
import { createMutationHook } from "../lib/createApolloHook"

// MUTATION/CREATE_ITEM_REVIEW_IMAGE
export const CREATE_ITEM_REVIEW_IMAGE = gql`
  mutation ($image: Upload!){
    createItemReviewImage(image:$image) {
        id
        uri
    }
  }
`

export interface CreateItemReviewImage {
    id: number
    uri: string
}

interface CreateItemReviewImageData {
    createItemReviewImage: CreateItemReviewImage
}
interface CreateItemReviewImageVars {
    image: ReactNativeFile
}
export const useCreateItemReviewImage = (options?: MutationHookOptions<CreateItemReviewImageData, CreateItemReviewImageVars>) => createMutationHook<CreateItemReviewImageData, CreateItemReviewImageVars>(CREATE_ITEM_REVIEW_IMAGE, {
    ...options
})