import { useIsFocused, useNavigation, useRoute } from '@react-navigation/core'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { WIDTH } from '../../constants/styles'
import { useEvents } from '../../graphql/event'
import BaseSkeletonPlaceHolder from '../Loading/BaseSkeletonPlaceHolder'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)


const BannerCarousel = () => {

    const scrollViewRef = useRef<ScrollView>(null)
    const { navigate } = useNavigation()
    const isFocused = useIsFocused()
    const [scrollX] = useState(new Animated.Value(0))
    const [intervalId, setIntervalId] = useState<null | number>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isDrag, setIsDrag] = useState(false)
    const { data } = useEvents()

    const startAutoScroll = () => {
        if (!data) return
        if (intervalId) stopAutoScroll()

        const id = setInterval(() => {
            scrollViewRef.current?.scrollTo({ animated: true, x: (((currentIndex + 1) % data.events.length) + data.events.length) * WIDTH })
        }, 2500)
        setIntervalId(Number(id))
    }

    const stopAutoScroll = () => {
        if (!intervalId) return
        clearTimeout(intervalId)
    }

    const onScrollEnd = useCallback(() => { // infinity scroll
        if (!data) return
        scrollViewRef.current?.scrollTo({ animated: false, x: (currentIndex + data.events.length) * WIDTH })
    }, [currentIndex, data, startAutoScroll])

    useEffect(() => {
        if (!isFocused) return stopAutoScroll()
        if (isDrag) return stopAutoScroll()
        if (!data) return
        startAutoScroll()
        return stopAutoScroll()
    }, [data, currentIndex, isDrag, isFocused])


    if (!data) return ( // loading
        <BaseSkeletonPlaceHolder>
            <View style={styles.container} />
        </BaseSkeletonPlaceHolder>
    )

    if (data.events.length === 0) return null

    return (
        <View style={styles.container} >
            <AnimatedScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                overScrollMode='never'
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        //@ts-ignore
                        listener: ({ nativeEvent }) => setCurrentIndex(Math.round(nativeEvent.contentOffset.x / WIDTH) % data.events.length),
                        useNativeDriver: true
                    }
                )}
                contentOffset={{ x: data.events.length * WIDTH, y: 0 }}
                onScrollBeginDrag={() => setIsDrag(true)}
                onScrollEndDrag={() => setIsDrag(false)}
                onMomentumScrollEnd={onScrollEnd}
            >
                {[...data.events, ...data.events, ...data.events].map((item, index) =>
                    <Pressable
                        onPress={() => navigate('EventDetail', { id: item.id })}
                        key={index.toString()}
                    >
                        <Image
                            style={styles.image}
                            source={{ uri: item.bannerImage }}
                        />
                    </Pressable>
                )}
            </AnimatedScrollView>
            <View style={styles.indicatorContainer} >
                {data.events.map((_, i) =>
                    <View key={i.toString()} style={[styles.dot, { opacity: i === currentIndex ? 1 : 0.5 }]} />
                )}
            </View>
        </View>
    )
}

export default BannerCarousel

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: WIDTH * 9 / 16,
        alignItems: 'center'
    },
    image: {
        width: WIDTH,
        height: WIDTH * 9 / 16
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
        marginHorizontal: 3,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
    }
})
