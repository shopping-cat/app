import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import BaseText from '../../../components/BaseText'
import ReviewCard from '../../../components/Cards/ReviewCard'
import RateStars from '../../../components/RateStars'
import RightArrowIcon from '../../../components/Svgs/RightArrowIcon'
import { GRAY, VERY_LIGHT_GRAY, VERY_VERY_LIGHT_GRAY } from '../../../constants/styles'

const dummyRate = 4.2
const dummyReviewNum = 234
const dummyReviews = [
    {
        id: 1
    },
    {
        id: 2
    },
    {
        id: 3
    },
    {
        id: 4
    },
    {
        id: 5
    }
]



const ReviewTab = () => {
    return (
        <View style={styles.container} >
            <View style={styles.rateContainer} >
                <RateStars
                    rate={dummyRate}
                    spacing={6}
                    starSize={24}
                    emptyColor={VERY_LIGHT_GRAY}
                />
                <BaseText style={styles.rate} >{dummyRate}</BaseText>
            </View>
            <MoreReview />
            {dummyReviews.map((item) => <ReviewCard key={item.id} {...item} />)}
            <MoreReview />
        </View>
    )
}

const MoreReview = () => {

    const { navigate } = useNavigation()

    const onMoreReview = useCallback(() => {
        navigate('ItemReview')
    }, [])

    return (
        <Pressable
            onPress={onMoreReview}
            style={styles.moreReviewContainer}
        >
            <BaseText style={styles.moreReviewText} >{dummyReviewNum}개의 리뷰 전체보기</BaseText>
            <RightArrowIcon fill={GRAY} />
        </Pressable>
    )
}

export default ReviewTab

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
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
    moreReviewContainer: {
        width: '100%',
        height: 56,
        backgroundColor: VERY_VERY_LIGHT_GRAY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    moreReviewText: {
        color: GRAY
    },
})