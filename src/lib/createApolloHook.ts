import { MutationHookOptions, useMutation, QueryHookOptions, useQuery } from "@apollo/client"
import { DocumentNode } from "graphql"
import { ToastAndroid } from "react-native"

export const createMutationHook = <Data, Vars>(mutation: DocumentNode, options?: MutationHookOptions<Data, Vars>) =>
    useMutation<Data, Vars>(mutation, {
        ...options,
        // onCompleted: data => console.log(data),
        onError: (error) => {
            if (__DEV__) console.error(error.message)
            ToastAndroid.show(error?.message || 'Invalid error', ToastAndroid.SHORT)
        }
    })

export const createQueryHook = <Data, Vars>(query: DocumentNode, options?: QueryHookOptions<Data, Vars>) =>
    useQuery<Data, Vars>(query, {
        // onCompleted: data => console.log(data), //console.log middle ware
        onError: (error) => {
            if (__DEV__) console.error(error.message)
            ToastAndroid.show(error?.message || 'Invalid error', ToastAndroid.SHORT)
        },
        ...options,
    })