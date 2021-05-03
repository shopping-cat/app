import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback } from "react"

const visibleVar = makeVar<boolean>(false)

const useLoadingModal = () => {

    const visible = useReactiveVar(visibleVar)

    const open = useCallback(() => {
        visibleVar(true)
    }, [])

    const close = useCallback(() => {
        visibleVar(false)
    }, [])


    return {
        open,
        close,
        visible
    }
}

export default useLoadingModal