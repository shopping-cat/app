import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback, useState } from "react"
import { ID } from "../constants/types"
import { Item } from "../graphql/item"

const isSelectModeVar = makeVar<boolean>(false)
const selectListVar = makeVar<ID[]>([])

const useZzimFooter = (data?: Item[]) => {
    const isSelectMode = useReactiveVar(isSelectModeVar)
    const selectList = useReactiveVar(selectListVar)

    const onSelectAll = useCallback(() => {
        if (!data) return
        selectListVar(data.map(v => v.id))
    }, [data])

    const onDelete = useCallback(() => {
        isSelectModeVar(false)
        // TODO
    }, [selectList])

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