import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import ImageCropPicker from 'react-native-image-crop-picker'
import { VERY_LIGHT_GRAY, WIDTH } from '../constants/styles'
import { MAX_REVIEW_IMAGE_NUMBER } from '../constants/values'
import useSelectBottomSheet from '../hooks/useSelectBottomSheet'
import ImageUploadPlusIcon from './Svgs/ImageUploadPlusIcon'

interface ImagesUploaderProps {
    images: string[]
    setImages: (images: string[]) => void
    setLoading: (isLoading: boolean) => void
    marginHorizon?: number
}

const ImagesUploader: React.FC<ImagesUploaderProps> = ({ images, setImages, setLoading, marginHorizon }) => {

    const { navigate } = useNavigation()
    const { open } = useSelectBottomSheet()

    const onImageSelect = useCallback(async () => {
        try {
            const { path } = await ImageCropPicker.openPicker({
                // cropping: true,
                // freeStyleCropEnabled: true,
                cropperCancelText: '취소',
                loadingLabelText: '불러오는중',
                cropperChooseText: '완료',
                mediaType: 'photo',
            })
            setImages([...images, path])
        } catch (error) {

        }
    }, [images, setImages])

    const onImagePress = useCallback((index: number) => {
        open(
            ['자세히 보기', '삭제'],
            (i) => {
                if (i === 0) navigate('ImageView', { images, index })
                if (i === 1) setImages(images.filter((_, i) => i !== index))
            }
        )
    }, [images, setImages])

    if (!marginHorizon) return null

    return (
        <FlatList
            style={[styles.container, { marginLeft: -marginHorizon }]}
            horizontal
            overScrollMode='never'
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, index }) =>
                <Pressable onPress={() => onImagePress(index)} >
                    <Image source={{ uri: item }} style={styles.image} />
                </Pressable>
            }
            ListHeaderComponent={<View style={{ width: marginHorizon }} />}
            ListFooterComponent={
                <View style={styles.footer} >
                    {MAX_REVIEW_IMAGE_NUMBER > images.length && <Pressable
                        onPress={onImageSelect}
                        style={styles.addBtn}
                    >
                        <ImageUploadPlusIcon />
                    </Pressable>}
                    <View style={{ width: marginHorizon - 4 }} />
                </View>
            }
        />
    )
}

ImagesUploader.defaultProps = {
    marginHorizon: 32
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