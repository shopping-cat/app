import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback } from "react"


const titleVar = makeVar<string>('')
const contentVar = makeVar<string>('')
const visibleVar = makeVar<boolean>(false)

let callBackVar = () => { }

const useConfirm = () => {

    const title = useReactiveVar(titleVar)
    const content = useReactiveVar(contentVar)
    const visible = useReactiveVar(visibleVar)

    const show = useCallback((title: string, content: string, callback: () => void) => {
        titleVar(title)
        contentVar(content)
        callBackVar = callback
        setTimeout(() => { visibleVar(true) }, 100)
    }, [])

    const close = useCallback(() => {
        visibleVar(false)
    }, [])

    const onConfirm = useCallback(() => {
        callBackVar && callBackVar()
        close()
    }, [callBackVar, close])

    return {
        show,
        close,
        onConfirm,
        title,
        content,
        visible
    }
}

export default useConfirm