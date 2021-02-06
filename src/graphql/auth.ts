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

