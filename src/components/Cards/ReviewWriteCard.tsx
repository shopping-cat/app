import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { CreateableItemReview } from '../../graphql/itemReview'
import dateFormat from '../../lib/dateFormat'
import { ReviewPostScreenProps } from '../../screens/ReviewPostScreen'
import BaseSkeletonPlaceHolder from '../BaseSkeletonPlaceHolder'
import BaseText from '../BaseText'
import RateStars from '../RateStars'


const ReviewWirteCard: React.FC<CreateableItemReview> = ({ id, item, deliveryCompletionDate, stringOptionNum }) => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        const params: ReviewPostScreenProps = {
            orderId: id,
            name: item.name,
            option: stringOptionNum
        }
        navigate('ReviewPost', params)
    }, [id, item, stringOptionNum])

    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <Image
                source={{ uri: item.mainImage }}
                style={styles.image}
            />
            <View>
                <BaseText>{item.name}</BaseText>
                <BaseText style={styles.date} >배송완료일 {dateFormat(deliveryCompletionDate)}</BaseText>
                <RateStars
                    rate={0}
                    emptyColor={VERY_LIGHT_GRAY}
                    starSize={24}
                    spacing={4}
                />
            </View>
        </Pressable>
    )
}

export default ReviewWirteCard

export const ReviewWriteCardSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={styles.container} >
                <View style={styles.image} />
                <View style={{ flex: 1 }} >
                    <View style={{ height: 16, width: '50%', borderRadius: 6 }} />
                    <View style={{ height: 16, width: '30%', borderRadius: 6, marginTop: 8 }} />
                </View>
            </View>
        </BaseSkeletonPlaceHolder>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        flexDirection: 'row'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    date: {
        marginVertical: 16,
        color: GRAY
    }
})
