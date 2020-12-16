import { useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThinLine from '../../components/ThinLine'
import ItemDetailHeader from '../../components/Headers/ItemDetailHeader'
import ImageCarousel from '../../components/ImageCarousel'
import { STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import ItemDetailInfo from './ItemDetailInfo'
import ItemDetailTabView from './ItemDetailTabView'
import ItemDetailTabViewNavigator from './ItemDetailTabViewNavigator'
import UpFab from '../../components/UpFab'
import ItemDetailFooter from './ItemDetailFooter'

const dummyImages = ['https://wallpaperaccess.com/full/32048.jpg', 'https://site.groupe-psa.com/content/uploads/sites/9/2016/12/white-background-2.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg', 'https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg', 'https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg', 'https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg', 'https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg', 'https://wallpaperaccess.com/full/32048.jpg', 'https://i.pinimg.com/originals/36/0c/62/360c628d043b2461d011d0b7f9b4d880.jpg']

const ItemDetail = () => {

    const { bottom } = useSafeAreaInsets()
    const { params } = useRoute()

    const scrollViewRef = useRef<ScrollView>(null)
    const [scrollY] = useState(new Animated.Value(0))
    const [isLight, setIsLight] = useState(true) // status bar color
    const [tabViewIndex, setTabViewIndex] = useState(0)
    const [itemDetailInfoHeight, setItemDetailInfoHeight] = useState(0)
    const scrollToTabViewTopTarget = itemDetailInfoHeight - 56 - STATUSBAR_HEIGHT

    useEffect(() => {
        // 언제 status bar style 색깔 바뀔지
        scrollY.addListener(({ value }) => setIsLight(value < WIDTH - 56 - STATUSBAR_HEIGHT))
    }, [])

    const onTopContentLayout = useCallback((event: LayoutChangeEvent) => {
        setItemDetailInfoHeight(event.nativeEvent.layout.height)
    }, [])

    const onFab = useCallback(() => {
        scrollViewRef.current?.scrollTo({ animated: true, y: 0 })
    }, [])

    const scrollToTabViewTop = useCallback(() => {
        //<Line /> 바로 아래로 scroll to
        scrollViewRef.current?.scrollTo({ animated: true, y: scrollToTabViewTopTarget })
    }, [scrollToTabViewTopTarget])


    return (
        <View style={[styles.container, { paddingBottom: bottom }]} >
            <StatusBar translucent backgroundColor='transparent' barStyle={isLight ? 'light-content' : 'dark-content'} />
            <ItemDetailHeader itemDetailInfoHeight={itemDetailInfoHeight} scrollY={scrollY} />
            <Animated.ScrollView
                ref={scrollViewRef}
                overScrollMode='never'
                scrollEventThrottle={16}
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            >
                <View onLayout={onTopContentLayout}  >
                    <ImageCarousel images={dummyImages} />
                    <ItemDetailInfo />
                    <ThinLine />
                </View>
                <View style={styles.tabViewNavigatorWrapper} >
                    <ItemDetailTabViewNavigator
                        index={tabViewIndex}
                        setIndex={setTabViewIndex}
                        scrollToTop={scrollToTabViewTop}
                    />
                </View>
                <ItemDetailTabView
                    index={tabViewIndex}
                    onIndexChange={setTabViewIndex}
                />
            </Animated.ScrollView>
            <UpFab
                animation={scrollToTabViewTopTarget > 0}
                scrollY={scrollY}
                inputRange={[0, scrollToTabViewTopTarget, scrollToTabViewTopTarget + 50]}
                style={{ bottom: 80 + bottom + 16 }}
                onPress={onFab}
            />
            <ItemDetailFooter />
        </View>
    )
}

export default ItemDetail

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabViewNavigatorWrapper: {
        width: '100%',
        marginTop: -(56 + STATUSBAR_HEIGHT),
        paddingTop: 56 + STATUSBAR_HEIGHT,
    }
})