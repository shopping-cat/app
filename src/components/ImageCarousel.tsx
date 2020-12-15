import React, { useCallback, useState } from 'react'
import { FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from 'react-native'
import { WIDTH } from '../constants/styles'

interface ImageCarouselProps {
    images: string[]
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {

    const [targetIndex, setTargetIndex] = useState(0)

    const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        setTargetIndex(Math.floor(0.5 + (event.nativeEvent.contentOffset.x / WIDTH)))
    }, [])

    return (
        <View style={styles.container} >
            <FlatList
                horizontal={true}
                overScrollMode='never'
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                data={images}
                scrollEventThrottle={16}
                onScroll={onScroll}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) =>
                    <Image
                        style={styles.image}
                        source={{ uri: item }}
                    />
                }
            />
            {/* indicator */}
            <View style={styles.indicatorContainer} >
                {images.map((_, i) =>
                    <View key={i.toString()} style={[styles.dot, { opacity: i === targetIndex ? 1 : 0.5 }]} />
                )}
            </View>
        </View>
    )
}

export default ImageCarousel

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: WIDTH,
        alignItems: 'center'
    },
    image: {
        width: WIDTH,
        height: WIDTH
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 16
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
        marginHorizontal: 3
    }
})