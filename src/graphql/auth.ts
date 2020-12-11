import { gql, QueryHookOptions, useApolloClient } from "@apollo/client";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";

// QUERY/I_USER
export const I_USER = gql`
  query IUser {
    iUser {
      id
    }
  }
`
interface IUserData {
  iUser: {
    id: number
  }
}
interface IUserVars {

}
export const useIUser = (options?: QueryHookOptions) => createQueryHook<IUserData, IUserVars>(I_USER, {
  ...options
})

// QUERY/KAKAO_TOKEN_TO_FIREBASE_TOKEN
export const KAKAO_TOKEN_TO_FIREBASE_TOKEN = gql`
    query KakaoTokenToFirebaseToken ($kakaoAccessToken: String!){
      kakaoTokenToFirebaseToken(kakaoAccessToken: $kakaoAccessToken) 
    }
`
export interface KakaoTokenToFirebaseTokenData {
  kakaoTokenToFirebaseToken: string
}
export interface KakaoTokenToFirebaseTokenDataVars {
  kakaoAccessToken: string
}