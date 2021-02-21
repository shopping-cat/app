import { Route, useNavigation, useRoute } from '@react-navigation/native'
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
import { MyItemReview, useUpdateItemReview } from '../../graphql/itemReview'
import useInput from '../../hooks/useInput'



const ReviewModifyScreen = () => {

    const { params } = useRoute<Route<'ReviewModify', MyItemReview>>()
    const { goBack } = useNavigation()

    const [rate, setRate] = useState(params.rate)
    const [images, setImages] = useState(params.images)
    const [isImageUploading, setIsImageUploading] = useState(false)
    const [content, onChangeContent] = useInput(params.content)

    const [updateItemReview, { loading }] = useUpdateItemReview()

    const active = rate !== 0
    const title = params.item.name + (params.order.stringOptionNum ? ` (옵션 : ${params.order.stringOptionNum})` : '')

    const onSubmit = useCallback(async () => {
        try {
            if (isImageUploading || !active || loading) return
            await updateItemReview({
                variables: {
                    id: params.id,
                    imageIds: images.map(v => v.id),
                    content,
                    rate
                }
            })
            goBack()
        } catch (error) {
            console.error(error)
        }
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
                        <BaseText style={styles.name} >{title}</BaseText>
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
                loading={loading}
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
