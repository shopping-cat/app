import { gql, MutationHookOptions, QueryHookOptions } from "@apollo/client"
import { createMutationHook, createQueryHook } from "../lib/createApolloHook"

export const CHECK_VERSION = gql`
  query ($version:String!, $os:String!){
    checkVersion(version:$version, os:$os)
  }
`
interface CheckVersionData {
    checkVersion: '업데이트 가능' | '업데이트 필요' | '최신' | 'DEV'
}
interface CheckVersionVars {
    version: string
    os: 'ios' | 'aos'
}
export const useCheckVersion = createQueryHook<CheckVersionData, CheckVersionVars>(CHECK_VERSION)