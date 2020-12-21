import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseText from '../../components/BaseText'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import ReviewCard from '../../components/Cards/ReviewCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RateStars from '../../components/RateStars'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import UpFab from '../../components/UpFab'
import { GRAY, VERY_LIGHT_GRAY, VERY_VERY_LIGHT_GRAY } from '../../constants/styles'

const dummyRate = 4.3
const dummyReviews = ['1', '2', '3', '4', '5'].map(v => ({ id: v }))
const dummyReviewNum = 234
const sortList = ['추천순', '최신순']

const ItemReviewScreen = () => {

    const { bottom } = useSafeAreaInsets()
    const flatlistRef = useRef<FlatList>(null)

    const [sortIndex, setSortIndex] = useState(0)
    const [visible, setVisible] = useState(false) // 정렬방법 선택 bottom sheet
    const sort = sortList[sortIndex]

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
                showsVerticalScrollIndicator={false}
                data={dummyReviews}
                renderItem={({ item }) => <ReviewCard {...item} />}
                ListHeaderComponent={
                    <>
                        <View style={styles.rateContainer} >
                            <RateStars
                                rate={dummyRate}
                                spacing={6}
                                starSize={24}
                                emptyColor={VERY_LIGHT_GRAY}
                            />
                            <BaseText style={styles.rate} >{dummyRate}</BaseText>
                        </View>
                        <Pressable
                            onPress={onSort}
                            style={styles.reviewNumSortContainer}
                        >
                            <BaseText style={styles.reviewNum} >{dummyReviewNum}개의 리뷰</BaseText>
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
                list={sortList}
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