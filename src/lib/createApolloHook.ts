import { MutationHookOptions, useMutation, QueryHookOptions, useQuery, ApolloError } from "@apollo/client"
import { DocumentNode } from "graphql"
import { toastMessageVar } from "../hooks/useToast"


const errorLogger = (error: ApolloError) => {
    if (__DEV__) console.log(error.message)
    toastMessageVar(error.message)
}

export const createMutationHook = <Data, Vars>(mutation: DocumentNode, options?: MutationHookOptions<Data, Vars>) =>
    useMutation<Data, Vars>(mutation, {
        ...options,
        // onCompleted: data => console.log(data),
        onError: (error) => {
            errorLogger(error)
            options?.onError && options.onError(error)
        }
    })

export const createQueryHook = <Data, Vars>(query: DocumentNode, options?: QueryHookOptions<Data, Vars>) =>
    useQuery<Data, Vars>(query, {
        // onCompleted: data => console.log(data), //console.log middle ware
        ...options,
        onError: (error) => {
            errorLogger(error)
            options?.onError && options.onError(error)
        },
    })
