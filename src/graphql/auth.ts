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