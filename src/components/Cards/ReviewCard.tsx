import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, Pressable, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR1, GRAY, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'
import { RecommendState } from '../../constants/types'
import { ItemReview, useItemReviewRecommend } from '../../graphql/itemReview'
import dateFormat from '../../lib/dateFormat'
import moneyFormat from '../../lib/moneyFormat'
import BaseSkeletonPlaceHolder from '../Loading/BaseSkeletonPlaceHolder'
import BaseText from '../Text/BaseText'
import RateStars from '../Rate/RateStars'


interface ReviewCardProps {
    scrollViewEnable?: boolean
}


const ReviewCard: React.FC<ItemReview & ReviewCardProps> = ({ scrollViewEnable, item, content, createdAt, id, imageUrls, order, likeNum, rate, recommendState: prevRecommendState, user }) => {

    const { navigate } = useNavigation()
    const [itemReviewRecommend] = useItemReviewRecommend()
    const [recommendState, setRecommendState] = useState<RecommendState>(prevRecommendState)
    const [firstLoading, setFirstLoading] = useState(true)
    const isLiked = recommendState === 'liked'
    const isUnliked = recommendState === 'unliked'

    const title = item.name + (order.stringOptionNum ? ` (옵션 : ${order.stringOptionNum})` : '')


    useEffect(() => { // recommendState와 서버 동기화
        if (firstLoading) {
            setFirstLoading(false)
            return
        }
        itemReviewRecommend({
            variables: {
                itemReviewId: id,
                recommendState
            }
        })
    }, [recommendState])

    const onLike = useCallback(() => {
        if (recommendState === 'liked') setRecommendState('none')
        else setRecommendState('liked')
    }, [recommendState])

    const onUnlike = useCallback(() => {
        if (recommendState === 'unliked') setRecommendState('none')
        else setRecommendState('unliked')
    }, [recommendState])

    const onReport = useCallback(() => {

    }, [])

    const onImage = useCallback((index: number) => { // 이미지 확대해서 보여주기
        navigate('ImageView', { index, images: imageUrls })
    }, [])



    return (
        <View style={styles.container} >
            <View style={styles.userInfoContainer} >
                <Image
                    source={{ uri: user.photo }}
                    style={styles.userProfileImage}
                />
                <View>
                    <BaseText style={styles.userName}>{user.name}</BaseText>
                    <RateStars
                        rate={rate}
                        spacing={3}
                        starSize={16}
                    />
                </View>
                <BaseText style={styles.date} >{dateFormat(createdAt)}</BaseText>
            </View>
            <BaseText style={styles.option} >{title}</BaseText>
            {scrollViewEnable && imageUrls.length !== 0 && <View style={styles.reviewImagesContainer} >
                <FlatList
                    horizontal
                    data={imageUrls}
                    keyExtractor={(item, index) => item + index}
                    showsHorizontalScrollIndicator={false}
                    ListHeaderComponent={<View style={{ width: 16 }} />}
                    ListFooterComponent={<View style={{ width: 12 }} />} // image component에 marginRight 4 가 있으니깐 12만
                    renderItem={({ item, index }) =>
                        <Pressable
                            onPress={() => onImage(index)}
                        >
                            <Image
                                source={{ uri: item }}
                                style={{ width: 56, height: 56, marginRight: 4 }}
                            />
                        </Pressable >
                    }
                />
            </View>}
            {!scrollViewEnable && imageUrls.length !== 0 &&
                <View style={styles.androidReviewImagesContainer} >
                    {imageUrls.map((item, index) =>
                        <Pressable
                            key={index.toString()}
                            onPress={() => onImage(index)}
                        >
                            <Image
                                source={{ uri: item }}
                                style={{ width: 56, height: 56, marginRight: 4, marginTop: 4 }}
                            />
                        </Pressable >
                    )}
                </View>
            }
            {!!content && <BaseText style={styles.content} >{content}</BaseText>}
            <BaseText style={styles.reviewRecommendNum} >{moneyFormat(likeNum)}명에게 도움됐습니다</BaseText>
            <View style={styles.recommendContainer} >
                <Pressable
                    onPress={onLike}
                    style={[styles.recommendBtn, {
                        backgroundColor: isLiked ? COLOR1 : '#fff',
                        borderWidth: isLiked ? 0 : 1
                    }]}
                >
                    <Icon name='thumb-up-outline' color={isLiked ? '#fff' : GRAY} size={24} />
                </Pressable>
                <Pressable
                    onPress={onUnlike}
                    style={[styles.recommendBtn, {
                        backgroundColor: isUnliked ? COLOR1 : '#fff',
                        borderWidth: isUnliked ? 0 : 1
                    }]}
                >
                    <Icon name='thumb-down-outline' color={isUnliked ? '#fff' : GRAY} size={24} />
                </Pressable>
                <Pressable style={styles.report} onPress={onReport} >
                    <BaseText style={styles.report} >신고하기</BaseText>
                </Pressable>
            </View>
            <View style={styles.endLine} />
        </View >
    )
}

export default ReviewCard

export const ReviewCardSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={[styles.container, { marginBottom: 24 }]} >
                <View style={styles.userInfoContainer} >
                    <View style={styles.userProfileImage} />
                    <View>
                        <View style={{ width: 100, height: 16, borderRadius: 6 }} />
                        <View style={{ width: 60, height: 16, borderRadius: 6, marginTop: 16 }} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 16 }} >
                    <View style={{ width: 56, height: 56, marginRight: 4, marginTop: 4 }} />
                    <View style={{ width: 56, height: 56, marginRight: 4, marginTop: 4 }} />
                    <View style={{ width: 56, height: 56, marginRight: 4, marginTop: 4 }} />
                    <View style={{ width: 56, height: 56, marginRight: 4, marginTop: 4 }} />
                    <View style={{ width: 56, height: 56, marginRight: 4, marginTop: 4 }} />
                    <View style={{ width: 56, height: 56, marginRight: 4, marginTop: 4 }} />
                    <View style={{ width: 56, height: 56, marginRight: 4, marginTop: 4 }} />
                </View>
                <View style={{ width: '70%', height: 16, borderRadius: 6, marginTop: 16 }} />
                <View style={{ width: '50%', height: 16, borderRadius: 6, marginTop: 16 }} />
            </View >
        </BaseSkeletonPlaceHolder>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 24
    },
    androidReviewImagesContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginBottom: 16
    },
    userInfoContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    userProfileImage: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 16
    },
    userName: {
        fontSize: 16,
        marginBottom: 16
    },
    date: {
        position: 'absolute',
        top: 0,
        right: 0,
        color: GRAY
    },
    option: {
        marginVertical: 16,
        color: GRAY
    },
    reviewImagesContainer: {
        width: WIDTH,
        marginLeft: -16
    },
    content: {
        lineHeight: 20,
        marginBottom: 16
    },
    reviewRecommendNum: {
        fontSize: 12,
        color: GRAY,
        marginTop: 8,
        marginBottom: 16,
    },
    recommendContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    recommendBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        borderColor: VERY_LIGHT_GRAY,
        marginRight: 16
    },
    report: {
        fontSize: 12,
        color: GRAY,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    endLine: {
        width: 56 + 56 + 16,
        height: 1,
        backgroundColor: VERY_LIGHT_GRAY,
        borderRadius: 1,
        marginTop: 24 // instead padding bottom 
    },
})
