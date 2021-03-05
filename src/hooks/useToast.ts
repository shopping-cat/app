import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback } from "react"

export const toastMessageVar = makeVar<string>('')

const useToast = () => {

    const message = useReactiveVar(toastMessageVar)

    const show = useCallback((message: string) => {
        toastMessageVar(message)
    }, [])

    return {
        show,
        message
    }
}

export default useToast