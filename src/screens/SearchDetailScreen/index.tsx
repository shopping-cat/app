import { Route, useRoute } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseText from '../../components/BaseText'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import BaseButton from '../../components/Buttons/BaseButton'
import ItemCard from '../../components/Cards/ItemCard'
import ItemCardAThird, { ItemCardAThirdSkeleton } from '../../components/Cards/ItemCardAThird'
import CategorySelector from '../../components/CategorySelector'
import SearchHeader from '../../components/Headers/SearchHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import UpFab from '../../components/UpFab'
import { GRAY } from '../../constants/styles'
import { useFilteredItems } from '../../graphql/item'
import { useSearch } from '../../graphql/search'
import useRefreshing from '../../hooks/useRefreshing'
import makeIdArray from '../../lib/makeIdArray'


interface RouteParams {
    keyword: string
}

type Sort = '인기순' | '최신순' | '저가순' | '고가순'
const SORT_LIST: Sort[] = ['인기순', '최신순', '저가순', '고가순']

const dummySearchResultNum = 320

const SearchDetailScreen = () => {

    const flatlistRef = useRef<FlatList>(null)

    // data
    const { params } = useRoute<Route<'SearchDetail', RouteParams>>()
    const [category, setCategory] = useState('전체')
    const [sortIndex, setSortIndex] = useState(0)
    const orderBy = SORT_LIST[sortIndex]
    const { data, refetch, fetchMore, loading } = useFilteredItems({ variables: { orderBy, category, keyword: params.keyword } })

    // ui
    const { bottom } = useSafeAreaInsets()
    const { onRefresh, refreshing } = useRefreshing(refetch)
    const [sortSheetVisible, setSortSheetVisible] = useState(false)



    const onSort = useCallback(() => {
        setSortSheetVisible(true)
    }, [])

    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <SearchHeader editable={false} />
            <CategorySelector onChange={(c1, c2) => setCategory(c2 || c1 || '전체')} />
            <FlatList
                ref={flatlistRef}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={() => fetchMore({
                    variables: { offset: data?.filteredItems.length }
                })}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                data={loading ? makeIdArray(12) : data?.filteredItems}
                renderItem={({ item }) => loading ? <ItemCardAThirdSkeleton /> : <ItemCardAThird {...item} />}
                numColumns={3}
                columnWrapperStyle={styles.flatlistColumnWrapper}
                ListHeaderComponent={
                    <Pressable
                        onPress={onSort}
                        style={styles.sortBtnContainer}
                    >
                        <BaseText style={styles.sortText} >전체 {dummySearchResultNum}건</BaseText>
                        <View style={styles.sortContainer} >
                            <BaseText style={styles.sortText}>{orderBy}</BaseText>
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
            <SelectBottomSheet
                visible={sortSheetVisible}
                onClose={() => setSortSheetVisible(false)}
                list={SORT_LIST}
                selectedIndex={sortIndex}
                onSelect={(i) => setSortIndex(i)}
            />
        </ScreenLayout>
    )
}

export default SearchDetailScreen

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
