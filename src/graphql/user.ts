import { gql, MutationHookOptions, QueryHookOptions, useApolloClient } from "@apollo/client";
import { ID } from "../constants/types";
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
interface IUserData {
  iUser: {
    id: number,
    refundBankAccount: {
      id: ID
      ownerName: string
      bankName: string
      accountNumber: string
    }
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
interface IUserVars {

}
export const useIUser = (options?: QueryHookOptions) => createQueryHook<IUserData, IUserVars>(I_USER, {
  ...options
})

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
export const useUpdateRefundBankAccount = (options?: MutationHookOptions<UpdateRefundBankAccountData, UpdateRefundBankAccountVars>) => createMutationHook<UpdateRefundBankAccountData, UpdateRefundBankAccountVars>(UPDATE_REFUND_BANK_ACCOUNT, {
  ...options
})

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
export const useUpdateDeliveryInfo = (options?: MutationHookOptions<UpdateDeliveryInfoData, UpdateDeliveryInfoVars>) => createMutationHook<UpdateDeliveryInfoData, UpdateDeliveryInfoVars>(UPDATE_DELIVERY_INFO, {
  ...options
})



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
export const useRecentSearchKeywords = (options?: QueryHookOptions) => createQueryHook<RecentSearchKeywordsData, RecentSearchKeywordsVars>(RECENT_SEARCH_KEYWORDS, {
  ...options
})

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
export const useRemoveAllSearchKeywords = (options?: MutationHookOptions) => createMutationHook<RemoveAllSearchKeywordsData, RemoveAllSearchKeywordsVars>(REMOVE_ALL_SEARCH_KEYWORDS, {
  ...options
})