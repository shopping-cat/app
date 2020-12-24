import { Route, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native'
import { COLOR1, GRAY, STATUSBAR_HEIGHT, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'
import DefaultHeader from '../../components/Headers/DefaultHeader';
import ScreenLayout from '../../components/Layouts/ScreenLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


interface ImageViewScreenProps {
    images: string[]
    index: number
}

const ImageViewScreen = () => {

    const { bottom } = useSafeAreaInsets()
    const { params } = useRoute<Route<string, ImageViewScreenProps>>()
    const footerFlatlistRef = useRef<FlatList>(null)
    const imageViewRef = useRef<FlatList>(null)

    const [index, setIndex] = useState(params.index || 0)

    useEffect(() => {
        imageViewRef.current?.scrollToOffset({ offset: WIDTH * index, animated: false })
    }, [])

    useEffect(() => {
        footerFlatlistRef.current?.scrollToOffset({ offset: 56 * index })
    }, [index])

    const onFooterPress = useCallback((i: number) => {
        imageViewRef.current?.scrollToOffset({ offset: WIDTH * i, animated: false })
    }, [])

    const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        setIndex(Math.floor(nativeEvent.contentOffset.x / WIDTH))
    }, [])

    return (
        <ScreenLayout >
            <DefaultHeader title='이미지 상세보기' />
            <FlatList
                ref={imageViewRef}
                overScrollMode='never'
                onScroll={onScroll}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={params.images}
                pagingEnabled
                contentContainerStyle={styles.flatlist}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) =>
                    <Image
                        style={styles.image}
                        source={{ uri: item }}
                    />
                }
            />
            <View style={[styles.footerContainer, { marginBottom: bottom }]} >
                <FlatList
                    ref={footerFlatlistRef}
                    overScrollMode='never'
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.footerFlatlist}
                    data={params.images}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index: i }) =>
                        <Pressable
                            onPress={() => onFooterPress(i)}
                        >
                            <Image
                                style={[styles.footerImage, { borderColor: i === index ? COLOR1 : VERY_LIGHT_GRAY }]}
                                source={{ uri: item }}
                            />
                        </Pressable>
                    }
                />
            </View>
        </ScreenLayout>
    )
}

export default ImageViewScreen

const styles = StyleSheet.create({
    image: {
        width: WIDTH,
        height: WIDTH
    },
    flatlist: {
        alignItems: 'center',
        overflow: 'hidden'
    },
    footerContainer: {
        width: '100%',
        height: 80,
        borderTopColor: VERY_LIGHT_GRAY,
        borderTopWidth: 1,
        justifyContent: 'center'
    },
    footerImage: {
        width: 48,
        height: 48,
        borderWidth: 1,
        marginRight: 8
    },
    footerFlatlist: {
        alignItems: 'center',
        paddingLeft: 8
    }
})