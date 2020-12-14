import { useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { Animated, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import ThinLine from '../components/ThinLine'
import ItemDetailHeader from '../components/Headers/ItemDetailHeader'
import ImageCarousel from '../components/ImageCarousel'
import { WIDTH } from '../constants/styles'
import ItemDetailInfo from '../components/ItemDetailInfo'

const dummyImages = ['https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg', 'https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg', 'https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg', 'https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg', 'https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg', 'https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg']

const ItemDetail = () => {

    const { params } = useRoute()

    const [scrollY] = useState(new Animated.Value(0))
    const [isLight, setIsLight] = useState(true) // status bar color

    useEffect(() => {
        // 언제 status bar 색깔 바뀔지
        scrollY.addListener(({ value }) => setIsLight(value < WIDTH - 56 - getStatusBarHeight()))
    }, [])

    return (
        <View style={{ flex: 1 }} >
            <StatusBar translucent backgroundColor='transparent' barStyle={isLight ? 'light-content' : 'dark-content'} />
            <ItemDetailHeader scrollY={scrollY} />
            <Animated.ScrollView
                overScrollMode='never'
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
            >
                <ImageCarousel images={dummyImages} />
                <ItemDetailInfo />
                <ThinLine />
                <View style={{ height: 112, width: '100%', backgroundColor: 'red', }} />
                <View style={{ height: 10000 }} />
            </Animated.ScrollView>
        </View>
    )
}

export default ItemDetail

const styles = StyleSheet.create({})
