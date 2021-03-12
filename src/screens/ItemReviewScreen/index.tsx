import { Route, useRoute } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseText from '../../components/Text/BaseText'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import ReviewCard, { ReviewCardSkeleton } from '../../components/Cards/ReviewCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RateStars from '../../components/Rate/RateStars'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import UpFab from '../../components/Buttons/UpFab'
import { GRAY, VERY_LIGHT_GRAY, VERY_VERY_LIGHT_GRAY } from '../../constants/styles'
import { ID } from '../../constants/types'
import { useItemReviews } from '../../graphql/itemReview'
import useRefreshing from '../../hooks/useRefreshing'
import makeIdArray from '../../lib/makeIdArray'
import moneyFormat from '../../lib/moneyFormat'

const SORT_LIST = ['추천순', '최신순']

export interface ItemReviewScreenProps {
    itemId: ID
    averageRate: number
    reviewNum: number
}

const ItemReviewScreen = () => {
    // DATA
    const { params } = useRoute<Route<'ItemReview', ItemReviewScreenProps>>()
    const [sortIndex, setSortIndex] = useState(0)
    const sort = SORT_LIST[sortIndex]
    const { data, loading, fetchMore, refetch } = useItemReviews({
        variables: {
            orderBy: sort,
            itemId: params.itemId
        }
    })
    const { onRefresh, refreshing } = useRefreshing(refetch)

    // UI
    const { bottom } = useSafeAreaInsets()
    const flatlistRef = useRef<FlatList>(null)
    const [visible, setVisible] = useState(false) // 정렬방법 선택 bottom sheet


    const onSort = useCallback(() => {
        setVisible(true)
    }, [])

    const onFab = useCallback(() => {
        flatlistRef.current?.scrollToOffset({ offset: 0, animated: true })
    }, [])


    return (
        <ScreenLayout>
            <DefaultHeader title='리뷰' />
            <FlatList
                ref={flatlistRef}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={() => fetchMore({ variables: { offset: data?.itemReviews.length } })}
                onEndReachedThreshold={0.4}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                keyExtractor={({ id }) => id.toString()}
                data={loading ? makeIdArray(3) : data?.itemReviews}
                renderItem={({ item }) => loading ? <ReviewCardSkeleton /> : <ReviewCard scrollViewEnable {...item} />}
                ListHeaderComponent={
                    <>
                        <View style={styles.rateContainer} >
                            <RateStars
                                rate={params.averageRate}
                                spacing={6}
                                starSize={24}
                                emptyColor={VERY_LIGHT_GRAY}
                            />
                            <BaseText style={styles.rate} >{params.averageRate}</BaseText>
                        </View>
                        <Pressable
                            onPress={onSort}
                            style={styles.reviewNumSortContainer}
                        >
                            <BaseText style={styles.reviewNum} >{moneyFormat(params.reviewNum)}개의 리뷰</BaseText>
                            <View style={styles.sortContainer} >
                                <BaseText style={styles.sort} >{sort}</BaseText>
                                <DownArrowIcon />
                            </View>
                        </Pressable>
                    </>
                }
                ListFooterComponent={<View style={{ height: bottom + 48 + 32 }} />}
            />
            <UpFab
                style={{ marginBottom: bottom, zIndex: 0 }}
                onPress={onFab}
            />
            <SelectBottomSheet
                visible={visible}
                onClose={() => setVisible(false)}
                list={SORT_LIST}
                onSelect={(i) => setSortIndex(i)}
                selectedIndex={sortIndex}
            />
        </ScreenLayout>
    )
}

export default ItemReviewScreen

const styles = StyleSheet.create({
    rateContainer: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    rate: {
        fontSize: 20,
        color: GRAY
    },
    reviewNumSortContainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: VERY_VERY_LIGHT_GRAY,
        justifyContent: 'space-between'
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sort: {
        color: GRAY,
        marginRight: 8
    },
    reviewNum: {
        color: GRAY
    }
})