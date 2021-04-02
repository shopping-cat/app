import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import BaseText, { baseTextStyle } from '../../components/Text/BaseText'
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ImagesUploader from '../../components/Uploader/ImagesUploader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RateStars from '../../components/Rate/RateStars'
import StatusBarHeightView from '../../components/View/StatusBarHeightView'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import { useItemReview, useUpdateItemReview } from '../../graphql/itemReview'
import useInput from '../../hooks/useInput'
import { CreateItemReviewImage } from '../../graphql/itemReviewImage'
import LoadingView from '../../components/View/LoadingView'

interface ReviewModifyScreenProps {
    id: number // itemReviewId
}

const ReviewModifyScreen = () => {

    const { params } = useRoute<Route<'ReviewModify', ReviewModifyScreenProps>>()
    const { goBack } = useNavigation()

    const { data } = useItemReview({ variables: { id: params.id } })

    const [rate, setRate] = useState(0)
    const [images, setImages] = useState<CreateItemReviewImage[]>([])
    const [isImageUploading, setIsImageUploading] = useState(false)
    const [content, onChangeContent, setContent] = useInput('')

    const [updateItemReview, { loading }] = useUpdateItemReview()

    const active = rate !== 0
    const title = data?.itemReview.item.name + (data?.itemReview.order.stringOptionNum ? ` (옵션 : ${data.itemReview.order.stringOptionNum})` : '')

    useEffect(() => {
        if (!data) return
        setRate(data.itemReview.rate)
        setImages(data.itemReview.images)
        setContent(data.itemReview.content)
    }, [data])

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
                {!data && <LoadingView />}
                {data && <ScrollView
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
                </ScrollView>}
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
