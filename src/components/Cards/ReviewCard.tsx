import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR1, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'
import { RecommendState } from '../../constants/types'
import { IS_ANDROID, IS_IOS } from '../../constants/values'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'
import RateStars from '../RateStars'

const dummyUserName = '나비 고양이'
const dummyUserProfileImage = 'https://c.files.bbci.co.uk/41CF/production/_109474861_angrycat-index-getty3-3.jpg'
const rate = 3.5
const option = '딱해먹 고양이 구름다리 벽걸이 캣타워 (옵션 : 빨간색 | M)'
const date = '2020.05.18'
const reviewImages = ['https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b', 'https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b', 'https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b', 'https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b']
const reviewContent = '빠른 배송! 조립은 30분 정도 걸린 것 같아요 여자 혼자 가능합니다 원목 상태나 마무리 상태도 너무 좋아요 우리집 텐텐 통통이 너무 좋아합니다! 저희집 천장이 낮아서 캣폴 설치되는 상품이 많이없어서 정말 한참을 찾다가 그린웨일을 알게 되었는데 상담도 잘 해주시고 설치 방법도 잘 설명해주셨어요! 너무 감사합니다!'
const reviewRecommendNum = 5123


const ReviewCard: React.FC<any> = () => {

    const { navigate } = useNavigation()
    const [recommendState, setRecommendState] = useState<RecommendState>('none')
    const isLiked = recommendState === 'liked'
    const isUnliked = recommendState === 'unliked'


    useEffect(() => { // recommendState와 서버 동기화

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
        navigate('ImageView', { index, images: reviewImages })
    }, [])



    return (
        <View style={styles.container} >
            <View style={styles.userInfoContainer} >
                <Image
                    source={{ uri: dummyUserProfileImage }}
                    style={styles.userProfileImage}
                />
                <View>
                    <BaseText style={styles.userName}>{dummyUserName}</BaseText>
                    <RateStars
                        rate={rate}
                        spacing={3}
                        starSize={16}
                    />
                </View>
                <BaseText style={styles.date} >{date}</BaseText>
            </View>
            <BaseText style={styles.option} >{option}</BaseText>
            {IS_IOS && <View style={styles.reviewImagesContainer} >
                <FlatList
                    horizontal
                    data={reviewImages}
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
            {IS_ANDROID &&
                <View style={styles.androidReviewImagesContainer} >
                    {reviewImages.map((item, index) =>
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
            <BaseText style={styles.content} >{reviewContent}</BaseText>
            <BaseText style={styles.reviewRecommendNum} >{moneyFormat(reviewRecommendNum)}명에게 도움됐습니다</BaseText>
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
        marginTop: 16
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
        marginTop: 16
    },
    reviewRecommendNum: {
        fontSize: 12,
        color: GRAY,
        marginTop: 24,
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
