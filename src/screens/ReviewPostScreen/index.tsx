import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
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

const ReviewPostScreen = () => {

    const { goBack } = useNavigation()

    const [rate, setRate] = useState(0)
    const [images, setImages] = useState<string[]>([])
    const [isImageUploading, setIsImageUploading] = useState(false)
    const [content, onChangeContent] = useInput()

    const active = rate !== 0

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
                <DefaultHeader title='리뷰 작성' disableBtns />
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
                text='등록하기'
            />
        </ScreenLayout>
    )
}

export default ReviewPostScreen

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