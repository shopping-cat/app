import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback } from "react"

export const toastMessageVar = makeVar<string>('')
export const toastDurationVar = makeVar<number>(2000)

const useToast = () => {

    const message = useReactiveVar(toastMessageVar)
    const duration = useReactiveVar(toastDurationVar)

    const show = useCallback((message: string, duration: number = 2000) => {
        toastDurationVar(duration)
        toastMessageVar(message)
    }, [])


    return {
        show,
        message,
        duration
    }
}

export default useToast