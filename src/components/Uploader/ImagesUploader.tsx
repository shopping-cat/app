/*
지금은 itemReviewImage만 업로드 가능 나중에 모든 종류의 image업로드 할 수 있도록 개선필요
*/

import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker'
import { VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'
import { MAX_REVIEW_IMAGE_NUMBER } from '../../constants/values'
import { CreateItemReviewImage, useCreateItemReviewImage } from '../../graphql/itemReviewImage'
import useSelectBottomSheet from '../../hooks/useSelectBottomSheet'
import generateImageToRNFile from '../../lib/generateRNFile'
import ImageUploadPlusIcon from '../Svgs/ImageUploadPlusIcon'

interface ImagesUploaderProps {
    images: CreateItemReviewImage[]
    setImages: (images: CreateItemReviewImage[]) => void
    setLoading: (isLoading: boolean) => void
    marginHorizon?: number
}

const ImagesUploader: React.FC<ImagesUploaderProps> = ({ images, setImages, setLoading, marginHorizon = 32 }) => {

    const { navigate } = useNavigation()
    const { open } = useSelectBottomSheet()
    const [imageTemp, setImageTemp] = useState<string | null>(null)

    const [createItemReviewImage, { loading }] = useCreateItemReviewImage()

    useEffect(() => {
        setLoading(loading) // 이미지 업로딩 동기화
    }, [loading])

    const onImageSelect = useCallback(async () => {
        try {
            if (loading) return
            const { path } = await ImageCropPicker.openPicker({
                cropping: true,
                freeStyleCropEnabled: true,
                cropperCancelText: '취소',
                loadingLabelText: '불러오는중',
                cropperChooseText: '완료',
                mediaType: 'photo',
                compressImageQuality: 0.8
            })

            setImageTemp(path) // 미리보기용

            const imageFile = generateImageToRNFile(path, 'itemReviewImage')
            const { data } = await createItemReviewImage({
                variables: {
                    image: imageFile
                }
            })
            if (!data) throw new Error
            setImages([...images, data.createItemReviewImage])
        } catch (error) {
            console.error(error)
        } finally {
            setImageTemp(null)
        }
    }, [images, setImages, loading])

    const onImagePress = useCallback((index: number) => {
        open(
            ['자세히 보기', '삭제'],
            (i) => {
                if (i === 0) navigate('ImageView', { images: images.map(v => v.uri), index })
                if (i === 1) setImages(images.filter((_, i) => i !== index))
            }
        )
    }, [images, setImages])

    return (
        <FlatList
            style={[styles.container, { marginLeft: -marginHorizon }]}
            horizontal
            overScrollMode='never'
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) =>
                <Pressable onPress={() => onImagePress(index)} >
                    <Image source={{ uri: item.uri }} style={styles.image} />
                </Pressable>
            }
            ListHeaderComponent={<View style={{ width: marginHorizon }} />}
            ListFooterComponent={
                <View style={styles.footer} >
                    {MAX_REVIEW_IMAGE_NUMBER > images.length && !loading &&
                        <Pressable
                            onPress={onImageSelect}
                            style={styles.addBtn}
                        >
                            <ImageUploadPlusIcon />
                        </Pressable>
                    }
                    {imageTemp &&
                        <View style={styles.imageTempContainer} >
                            <Image source={{ uri: imageTemp }} style={styles.image} />
                            <ActivityIndicator style={styles.loading} size='small' color='#fff' />
                        </View>
                    }
                    <View style={{ width: marginHorizon - 4 }} />
                </View>
            }
        />
    )
}

export default ImagesUploader

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: 56
    },
    footer: {
        flexDirection: 'row'
    },
    image: {
        width: 56,
        height: 56,
        marginRight: 4
    },
    imageTempContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    loading: {
        position: 'absolute'
    },
    addBtn: {
        width: 56,
        height: 56,
        marginRight: 4,
        borderColor: VERY_LIGHT_GRAY,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})