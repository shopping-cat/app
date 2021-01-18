import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'
import { IS_ANDROID, IS_IOS } from '../../constants/values'
import BaseText from '../BaseText'
import RateStars from '../RateStars'

const rate = 4
const name = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const date = '2020.05.18'
const reviewImages = ['https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b', 'https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b', 'https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b', 'https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b']
const reviewContent = '빠른 배송! 조립은 30분 정도 걸린 것 같아요 여자 혼자 가능합니다 원목 상태나 마무리 상태도 너무 좋아요 우리집 텐텐 통통이 너무 좋아합니다! 저희집 천장이 낮아서 캣폴 설치되는 상품이 많이없어서 정말 한참을 찾다가 그린웨일을 알게 되었는데 상담도 잘 해주시고 설치 방법도 잘 설명해주셨어요! 너무 감사합니다!'

const ReviewMyCard: React.FC<any> = () => {

    const { navigate } = useNavigation()

    const onImage = useCallback((index: number) => { // 이미지 확대해서 보여주기
        navigate('ImageView', { index, images: reviewImages })
    }, [])

    const onModify = useCallback(() => {
        navigate('ReviewModify')
    }, [])



    return (
        <View style={styles.container} >
            <View style={styles.nameContainer} >
                <BaseText style={styles.name} >{name}</BaseText>
                <TouchableOpacity
                    onPress={onModify}
                >
                    <BaseText style={styles.modify} >수정하기</BaseText>
                </TouchableOpacity>
            </View>
            <RateStars
                rate={rate}
                spacing={4}
                starSize={20}
            />
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
            <BaseText style={styles.date} >{date}</BaseText>
        </View >
    )
}

export default ReviewMyCard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    nameContainer: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 16
    },
    name: {
        fontSize: 16,
        flex: 1,
        marginRight: 20
    },
    modify: {
        color: COLOR2
    },
    reviewImagesContainer: {
        width: WIDTH,
        marginLeft: -16,
        marginTop: 16
    },
    androidReviewImagesContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 16
    },
    content: {
        lineHeight: 20,
        marginTop: 16
    },
    date: {
        color: GRAY,
        marginTop: 16
    }
})
