import { gql, MutationHookOptions, QueryHookOptions, useApolloClient } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import { ID } from "../constants/types";
import { client } from "../lib/apollo";
import { createMutationHook, createQueryHook } from "../lib/createApolloHook";


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

// QUERY/I_USER
export const I_USER = gql`
  query {
    iUser {
      id
      name
      photo
      notificationNum
      userDetail {
        email
      }
      certificatedInfo {
        id
        name
        phone
      }
      refundBankAccount {
        id
        ownerName
        bankName
        accountNumber
      }
      deliveryInfo {
        id
        postCode
        address
        addressDetail
        name
        phone
      }
    }
  }
`
export interface IUserData {
  iUser: {
    id: number
    name?: string
    photo?: string
    notificationNum: number
    certificatedInfo?: {
      id: number
      name: string
      phone: string
    }
    userDetail: {
      email: string
    }
    refundBankAccount?: {
      id: ID
      ownerName: string
      bankName: string
      accountNumber: string
    }
    deliveryInfo?: {
      id: ID
      postCode: string
      address: string
      addressDetail: string
      name: string
      phone: string
    }
  }
}
interface IUserVars {

}
export const useIUser = createQueryHook<IUserData, IUserVars>(I_USER)

// MUTATION/UPDATE_REFUND_BANK_ACCOUNT
export const UPDATE_REFUND_BANK_ACCOUNT = gql`
  mutation ($bankName:String!, $ownerName:String!, $accountNumber:String!) {
    updateRefundBankAccount(bankName:$bankName, ownerName: $ownerName, accountNumber:$accountNumber) {
      id
      refundBankAccount {
        id
        ownerName
        bankName
        accountNumber
      }
    }
  }
`
interface UpdateRefundBankAccountData {
  updateRefundBankAccount: {
    id: number,
    refundBankAccount: {
      id: ID
      ownerName: string
      bankName: string
      accountNumber: string
    }
  }
}
interface UpdateRefundBankAccountVars {
  ownerName: string
  bankName: string
  accountNumber: string
}
export const useUpdateRefundBankAccount = createMutationHook<UpdateRefundBankAccountData, UpdateRefundBankAccountVars>(UPDATE_REFUND_BANK_ACCOUNT)

// MUTATION/UPDATE_DELIVERY_INFO
export const UPDATE_DELIVERY_INFO = gql`
  mutation ($postCode:String!, $address:String!, $addressDetail:String!, $name:String!, $phone:String!) {
    updateDeliveryInfo(postCode:$postCode, address:$address, addressDetail:$addressDetail, name:$name, phone:$phone) {
      id
      deliveryInfo {
        id
        postCode
        address
        addressDetail
        name
        phone
      }
    }
  }
`
interface UpdateDeliveryInfoData {
  updateDeliveryInfo: {
    id: ID,
    deliveryInfo: {
      id: ID
      postCode: string
      address: string
      addressDetail: string
      name: string
      phone: string
    }
  }
}
interface UpdateDeliveryInfoVars {
  postCode: string
  address: string
  addressDetail: string
  name: string
  phone: string
}
export const useUpdateDeliveryInfo = createMutationHook<UpdateDeliveryInfoData, UpdateDeliveryInfoVars>(UPDATE_DELIVERY_INFO)


export const UPDATE_USER_PROFILE = gql`
  mutation ($name: String, $photo: Upload) {
    updateUserProfile(name: $name, photo: $photo) {
      id
      photo
      name
    }
  }
`
interface UpdateUserProfileData {
  updateUserProfile: {
    id: number
    photo: string
    name: string
  }
}
interface UpdateUserProfileVars {
  photo: ReactNativeFile | null
  name: string | null
}
export const useUpdateUserProfile = createMutationHook<UpdateUserProfileData, UpdateUserProfileVars>(UPDATE_USER_PROFILE)


export const REGIST_USER_PROFILE = gql`
  mutation ($input: RegistUserProfileInput!) {
    registUserProfile(input:$input) {
      id
      photo
      name
      eventMessageAllowDate
      privacyPolicyAllowDate
      termsOfServiceAllowDate
    }
  }
`
interface RegistUserProfileData { }
interface RegistUserProfileVars {
  input: {
    photo: ReactNativeFile | null
    name: string
    eventMessageAllow: boolean
  }
}
export const useRegistUserProfile = createMutationHook<RegistUserProfileData, RegistUserProfileVars>(REGIST_USER_PROFILE)



// QUERY/RECENT_SEARCH_KEYWORDS
export const RECENT_SEARCH_KEYWORDS = gql`
  query {
    iUser {
      id
      recentSearchKeywords {
        id
        keyword
      }
    }
  }
`
export interface RecentSearchKeyword {
  id: number
  keyword: string
}
interface RecentSearchKeywordsData {
  iUser: {
    id: number,
    recentSearchKeywords: RecentSearchKeyword[]
  }
}
interface RecentSearchKeywordsVars {

}
export const useRecentSearchKeywords = createQueryHook<RecentSearchKeywordsData, RecentSearchKeywordsVars>(RECENT_SEARCH_KEYWORDS)

// QUERY/REMOVE_ALL_SEARCH_KEYWORDS
export const REMOVE_ALL_SEARCH_KEYWORDS = gql`
  mutation {
    removeAllSearchKeywords {
      id
      recentSearchKeywords {
        id
        keyword
      }
    }
  }
`

interface RemoveAllSearchKeywordsData {
  removeAllSearchKeywords: {
    id: number,
    recentSearchKeywords: RecentSearchKeyword[]
  }
}
interface RemoveAllSearchKeywordsVars {

}
export const useRemoveAllSearchKeywords = createMutationHook<RemoveAllSearchKeywordsData, RemoveAllSearchKeywordsVars>(REMOVE_ALL_SEARCH_KEYWORDS)

// QUERY/WITHDRAWAL_USER
export const WITHDRAWAL_USER = gql`
  mutation {
    withdrawalUser {
      id
    }
  }
`

interface WithdrawalUserData {
  withdrawalUser: {
    id: string,
  }
}
interface WithdrawalUserVars {

}
export const useWithdrawalUser = createMutationHook<WithdrawalUserData, WithdrawalUserVars>(WITHDRAWAL_USER)


export const UPDATE_FCM_TOKEN = gql`
  mutation($token: String!) {
    updateFcmToken(token:$token) {
      id
    }
  }
`

interface UpdateFcmTokenData { }
export interface UpdateFcmTokenVars {
  token: string
}
export const useUpdateFcmToken = createMutationHook<UpdateFcmTokenData, UpdateFcmTokenVars>(UPDATE_FCM_TOKEN)


export const UPDATE_EVNET_MESSAGE_ALLOW = gql`
  mutation($allow: Boolean!) {
    updateEventMessageAllow(allow:$allow) {
      id
      eventMessageAllowDate
    }
  }
`

interface UpdateEventMessageAllowData { }
export interface UpdateEventMessageAllowVars {
  allow: boolean
}
export const useUpdateEventMessageAllow = createMutationHook<UpdateEventMessageAllowData, UpdateEventMessageAllowVars>(UPDATE_EVNET_MESSAGE_ALLOW)