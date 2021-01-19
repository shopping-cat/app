import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback } from "react"


const listVar = makeVar<string[]>([])
const visibleVar = makeVar<boolean>(false)
const callBackVar = makeVar<(i: number) => void>(() => { })


const useSelectBottomSheet = () => {

    const list = useReactiveVar(listVar)
    const visible = useReactiveVar(visibleVar)
    const callBack = useReactiveVar(callBackVar)

    const open = useCallback((list: string[], callBack: (i: number) => void) => {
        listVar(list)
        callBackVar(callBack)
        setTimeout(() => {
            visibleVar(true)
        }, 100)
    }, [])

    const close = useCallback(() => {
        visibleVar(false)
    }, [])

    const onSelected = useCallback((i: number) => {
        callBack(i)
    }, [callBack])

    return {
        list,
        visible,
        open,
        close,
        onSelected,
    }
}

export default useSelectBottomSheet