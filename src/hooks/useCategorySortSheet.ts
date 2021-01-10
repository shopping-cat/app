import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback } from "react"


type Sort = '인기순' | '최신순' | '저가순' | '고가순'
const SORT_LIST: Sort[] = ['인기순', '최신순', '저가순', '고가순']

const visibleVar = makeVar<boolean>(false)
const sortIndexVar = makeVar<number>(0)

const useCategorySortSheet = () => {

    const categorySortSheetVisible = useReactiveVar(visibleVar)
    const sortIndex = useReactiveVar(sortIndexVar)

    const open = useCallback(() => {
        visibleVar(true)
    }, [])

    const close = useCallback(() => {
        visibleVar(false)
    }, [])

    const onSelected = useCallback((i: number) => {
        sortIndexVar(i)
    }, [])

    return {
        categorySortSheetVisible,
        sortIndex,
        open,
        close,
        onSelected,
        SORT_LIST,
    }
}

export default useCategorySortSheet