import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseText from '../../components/BaseText'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import ItemCardAThird from '../../components/Cards/ItemCardAThird'
import CategorySelector from '../../components/CategorySelector'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import UpFab from '../../components/UpFab'
import { GRAY } from '../../constants/styles'
import useCategorySortSheet from '../../hooks/useCategorySortSheet'


const dummySearchResultNum = 1042

const CategoryScreen = () => {


    const flatlistRef = useRef<FlatList>(null)
    const { bottom } = useSafeAreaInsets()

    const { SORT_LIST, open, sortIndex } = useCategorySortSheet()


    const onSort = useCallback(() => {
        open()
    }, [])



    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <DefaultHeader underLine={false} disableGoBack title='카테고리' />
            <CategorySelector />
            <FlatList
                ref={flatlistRef}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                data={Array(30).fill(1).map((v, i) => ({ id: i }))}
                renderItem={({ item }) => <ItemCardAThird {...item} />}
                numColumns={3}
                columnWrapperStyle={styles.flatlistColumnWrapper}
                ListHeaderComponent={
                    <Pressable
                        onPress={onSort}
                        style={styles.sortBtnContainer}
                    >
                        <BaseText style={styles.sortText} >전체 {dummySearchResultNum}건</BaseText>
                        <View style={styles.sortContainer} >
                            <BaseText style={styles.sortText}>{SORT_LIST[sortIndex]}</BaseText>
                            <DownArrowIcon />
                        </View>
                    </Pressable>
                }
            />
            <UpFab
                onPress={() => flatlistRef.current?.scrollToOffset({ offset: 0 })}
                animation={false}
                style={{ marginBottom: bottom }}
            />
        </ScreenLayout>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({
    orderSelector: {
        width: '100%',
        height: 56,
        flexDirection: 'row'
    },
    orderBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    flatlistColumnWrapper: {
        paddingLeft: 8
    },
    sortBtnContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },
    sortText: {
        color: GRAY,
        marginRight: 8
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
