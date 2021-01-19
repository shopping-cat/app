import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import BaseText, { baseTextStyle } from '../../components/BaseText'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ImagesUploader from '../../components/ImagesUploader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RateStars from '../../components/RateStars'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import useInput from '../../hooks/useInput'

const dummyName = '딱해먹 고양이 구름다리 벽걸이 캣타워 (옵션 : 해먹 | 3개)'
const dummyRate = 4
const dummyReviewImages = ['https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b', 'https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b', 'https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b', 'https://gdimg.gmarket.co.kr/674434951/still/600?ver=1575534345', 'https://cf.shopee.ph/file/9b4e0ba85bc77f437258106ae4e3c54b']
const dummyContent = '빠른 배송! 조립은 30분 정도 걸린 것 같아요 여자 혼자 가능합니다 원목 상태나 마무리 상태도 너무 좋아요 우리집 텐텐 통통이 너무 좋아합니다! 저희집 천장이 낮아서 캣폴 설치되는 상품이 많이없어서 정말 한참을 찾다가 그린웨일을 알게 되었는데 상담도 잘 해주시고 설치 방법도 잘 설명해주셨어요! 너무 감사합니다!'

const ReviewModifyScreen = () => {

    const { goBack } = useNavigation()

    const [rate, setRate] = useState(0)
    const [images, setImages] = useState<string[]>([])
    const [isImageUploading, setIsImageUploading] = useState(false)
    const [content, onChangeContent, setContent] = useInput()

    const active = rate !== 0

    useEffect(() => {
        setRate(dummyRate)
        setImages(dummyReviewImages)
        setContent(dummyContent)
    }, [])

    const onSubmit = useCallback(() => {
        if (isImageUploading || !active) return
        goBack()
    }, [active, isImageUploading, rate, images, content])

    const onRate = useCallback((rate: number) => {
        setRate(rate)
    }, [])

    return (
        <ScreenLayout disableStatusbarHeight >
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior='padding'
                enabled={IS_IOS}
            >
                <StatusBarHeightView />
                <DefaultHeader title='리뷰 수정' disableBtns />
                <ScrollView
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    style={styles.container}
                >
                    <View style={styles.box} >
                        <BaseText style={styles.label} >구매한 상품</BaseText>
                        <BaseText style={styles.name} >{dummyName}</BaseText>
                    </View>
                    <View style={styles.box} >
                        <BaseText style={styles.label} >상품 평점</BaseText>
                        <RateStars
                            rate={rate}
                            emptyColor={VERY_LIGHT_GRAY}
                            starSize={24}
                            spacing={6}
                            onRate={onRate}
                        />
                    </View>
                    <View style={styles.box} >
                        <BaseText style={styles.label} >사진 (최대 9개)</BaseText>
                        <ImagesUploader
                            images={images}
                            setImages={setImages}
                            setLoading={setIsImageUploading}
                        />
                    </View>
                    <View style={styles.contentContainer} >
                        <BaseText style={styles.label} >상품평</BaseText>
                        <TextInput
                            style={[baseTextStyle, styles.content]}
                            placeholderTextColor={GRAY}
                            placeholder='상품 품질에 대한 솔직한 평가를 남겨주세요.'
                            value={content}
                            maxLength={500}
                            multiline
                            onChangeText={onChangeContent}
                        />
                    </View>
                    <View style={styles.paddingBottom} />
                </ScrollView>
            </KeyboardAvoidingView>
            <ButtonFooter
                active={active}
                onPress={onSubmit}
                text='수정 완료'
            />
        </ScreenLayout>
    )
}

export default ReviewModifyScreen

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1
    },
    container: {
        paddingHorizontal: 16
    },
    paddingBottom: {
        height: IS_IOS ? 80 : 24
    },
    box: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    contentContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    label: {
        fontSize: 16,
        marginBottom: 16
    },
    name: {
        color: GRAY
    },
    content: {
        padding: 0,
        lineHeight: 20
    }
})
