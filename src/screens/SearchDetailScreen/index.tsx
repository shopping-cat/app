import { Route, useRoute } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseText from '../../components/BaseText'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import BaseButton from '../../components/Buttons/BaseButton'
import ItemCard from '../../components/Cards/ItemCard'
import ItemCardAThird from '../../components/Cards/ItemCardAThird'
import CategorySelector from '../../components/CategorySelector'
import SearchHeader from '../../components/Headers/SearchHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import UpFab from '../../components/UpFab'
import { GRAY } from '../../constants/styles'
import { useSearch } from '../../graphql/search'


interface RouteParams {
    searchKeyword: string
}

type Sort = '인기순' | '최신순' | '저가순' | '고가순'
const SORT_LIST: Sort[] = ['인기순', '최신순', '저가순', '고가순']

const dummySearchResultNum = 320

const SearchDetailScreen = () => {

    const { params } = useRoute<Route<'SearchDetail', RouteParams>>()
    const { bottom } = useSafeAreaInsets()
    const [category, setCategory] = useState(null)
    const [refreshing, setRefresing] = useState(false)
    const [sortIndex, setSortIndex] = useState(0)
    const sort = SORT_LIST[sortIndex]
    const [sortSheetVisible, setSortSheetVisible] = useState(false)

    const onSort = useCallback(() => {
        setSortSheetVisible(true)
    }, [])

    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <SearchHeader editable={false} />
            <CategorySelector />
            <FlatList
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                data={Array(10).fill(1).map((v, i) => ({ id: i }))}
                renderItem={({ item }) => <ItemCardAThird {...item} />}
                numColumns={3}
                style={styles.flatlist}
                ListHeaderComponent={
                    <Pressable
                        onPress={onSort}
                        style={styles.sortBtnContainer}
                    >
                        <BaseText style={styles.sortText} >전체 {dummySearchResultNum}건</BaseText>
                        <View style={styles.sortContainer} >
                            <BaseText style={styles.sortText}>{sort}</BaseText>
                            <DownArrowIcon />
                        </View>
                    </Pressable>
                }
            />
            <UpFab
                onPress={() => { }}
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
    flatlist: {
        paddingLeft: 8
    },
    sortBtnContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 8, // flatlist 전체에 8을 줘서 8만 더 주면됨
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
