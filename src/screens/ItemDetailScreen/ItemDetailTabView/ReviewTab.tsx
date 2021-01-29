import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import BaseText from '../../../components/BaseText'
import ReviewCard from '../../../components/Cards/ReviewCard'
import RateStars from '../../../components/RateStars'
import RightArrowIcon from '../../../components/Svgs/RightArrowIcon'
import { GRAY, VERY_LIGHT_GRAY, VERY_VERY_LIGHT_GRAY, WIDTH } from '../../../constants/styles'
import { ItemDetail } from '../../../graphql/item'
import moneyFormat from '../../../lib/moneyFormat'


const ReviewTab: React.FC<ItemDetail> = ({ rate, bestItemReviews, reviewNum }) => {
    return (
        <View style={styles.container} >
            <View style={styles.rateContainer} >
                <RateStars
                    rate={rate}
                    spacing={6}
                    starSize={24}
                    emptyColor={VERY_LIGHT_GRAY}
                />
                <BaseText style={styles.rate} >{rate}</BaseText>
            </View>
            <MoreReview reviewNum={reviewNum} />
            {(bestItemReviews || []).map((item) => <ReviewCard key={item.id} {...item} />)}
            {reviewNum > 0 && <MoreReview reviewNum={reviewNum} />}
        </View>
    )
}

const MoreReview: React.FC<{ reviewNum: number }> = ({ reviewNum }) => {

    const { navigate } = useNavigation()

    const onMoreReview = useCallback(() => {
        navigate('ItemReview')
    }, [])

    return (
        <Pressable
            onPress={onMoreReview}
            style={styles.moreReviewContainer}
        >
            <BaseText style={styles.moreReviewText} >{moneyFormat(reviewNum)}개의 리뷰 전체보기</BaseText>
            <RightArrowIcon fill={GRAY} />
        </Pressable>
    )
}

export default ReviewTab

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
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