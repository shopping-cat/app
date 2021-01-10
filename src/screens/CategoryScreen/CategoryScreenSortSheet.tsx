import React from 'react'
import { StyleSheet } from 'react-native'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import useCategorySortSheet from '../../hooks/useCategorySortSheet'

const CategoryScreenSortSheet = () => {

    const { SORT_LIST, categorySortSheetVisible, close, onSelected, sortIndex } = useCategorySortSheet()

    return (
        <SelectBottomSheet
            visible={categorySortSheetVisible}
            onClose={close}
            list={SORT_LIST}
            selectedIndex={sortIndex}
            onSelect={onSelected}
        />
    )
}

export default CategoryScreenSortSheet

const styles = StyleSheet.create({})
