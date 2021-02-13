import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback, useEffect, useState } from "react"
import { ID } from "../constants/types"
import { Item, useUnlikeItems } from "../graphql/item"

let zzimItemData: Item[] = []
const isSelectModeVar = makeVar<boolean>(false)
const selectListVar = makeVar<ID[]>([])

const useZzimFooter = (data?: Item[]) => {

    const isSelectMode = useReactiveVar(isSelectModeVar)
    const selectList = useReactiveVar(selectListVar)

    const [unlikeItems, { loading }] = useUnlikeItems()


    useEffect(() => {
        if (!data) return
        zzimItemData = data
    }, [data])

    const onSelectAll = useCallback(() => {
        selectListVar(zzimItemData.map(v => v.id))
    }, [zzimItemData])

    const onDelete = useCallback(() => {
        if (loading) return
        isSelectModeVar(false)
        if (selectList.length === 0) return
        unlikeItems({
            variables: {
                itemIds: selectList
            }
        })
    }, [selectList, loading])

    const onCart = useCallback(() => {
        isSelectModeVar(false)
        // TODO
    }, [selectList])

    const onSelect = useCallback((id: ID) => {
        // 이미 리스트에 포함되어있으면 삭제 없으면 추가
        if (selectList.includes(id)) { // 삭제
            selectListVar(selectList.filter(v => v !== id))
        } else { //추가
            selectListVar([id, ...selectList])
        }
    }, [selectList])

    const onSelectMode = useCallback((id?: ID) => {
        selectListVar(id !== undefined ? [id] : [])
        isSelectModeVar(true)
    }, [])

    const onClose = useCallback(() => {
        isSelectModeVar(false)
    }, [])

    return {
        isSelectMode,
        selectList,
        onSelectAll,
        onDelete,
        onCart,
        onSelect,
        onSelectMode,
        onClose
    }
}

export default useZzimFooter