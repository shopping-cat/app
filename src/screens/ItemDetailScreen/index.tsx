import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent, ScrollView, StatusBar, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ThinLine from '../../components/View/ThinLine'
import ItemDetailHeader from '../../components/Headers/ItemDetailHeader'
import ImageCarousel from '../../components/Carousel/ImageCarousel'
import { STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import ItemDetailInfo from './ItemDetailInfo'
import ItemDetailTabView from './ItemDetailTabView'
import ItemDetailTabViewNavigator from './ItemDetailTabViewNavigator'
import UpFab from '../../components/Buttons/UpFab'
import ItemDetailFooter from './ItemDetailFooter'
import ItemDetailOptionSheet from './ItemDetailOptionSheet';
import { ID } from '../../constants/types';
import { useItem } from '../../graphql/item';
import ItemDetailPlaceHolder from './ItemDetailPlaceHolder';


interface ItemDetailProps {
    id: ID
}

const ItemDetailScreen = () => {

    const { bottom } = useSafeAreaInsets()
    const { goBack } = useNavigation()
    const { params } = useRoute<Route<'ItemDetail', ItemDetailProps>>()

    // DATA
    const { data } = useItem({ variables: { id: params.id } })

    // UI
    const scrollViewRef = useRef<ScrollView>(null)
    const tabViewRef = useRef<ScrollView>(null)
    const [optionModalVisible, setOptionModalVisible] = useState(false)
    const [scrollY] = useState(new Animated.Value(0)) // 전체 수직 스크롤뷰
    const [scrollX] = useState(new Animated.Value(0)) // 탭 뷰
    const [isLight, setIsLight] = useState(true) // status bar color
    const [tabViewIndex, setTabViewIndex] = useState(0)
    const [itemDetailInfoHeight, setItemDetailInfoHeight] = useState(0)
    const scrollToTabViewTopTarget = itemDetailInfoHeight - 56 - STATUSBAR_HEIGHT

    useEffect(() => {
        // id 가 없으면 goBack
        if (!params.id) goBack()
        // 언제 status bar style 색깔 바뀔지
        scrollY.addListener(({ value }) => setIsLight(value < WIDTH - 56 - STATUSBAR_HEIGHT))
        // tabView index 지정
        scrollX.addListener(({ value }) => setTabViewIndex(Math.round(value / WIDTH)))
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

    const scrollToTabViewIndex = useCallback((index: number) => {
        tabViewRef.current?.scrollTo({ x: index * WIDTH, animated: true })
    }, [])


    return (
        <View style={[styles.container, { paddingBottom: bottom }]} >
            <StatusBar translucent backgroundColor='transparent' barStyle={isLight ? 'light-content' : 'dark-content'} />
            <ItemDetailHeader itemDetailInfoHeight={itemDetailInfoHeight} scrollY={scrollY} />
            {!data && <ItemDetailPlaceHolder />}
            {data && <>
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
                        <ImageCarousel images={data.item.imageUrls} />
                        <ItemDetailInfo {...data.item} />
                        <ThinLine />
                    </View>
                    <View style={styles.tabViewNavigatorWrapper} >
                        <ItemDetailTabViewNavigator
                            index={tabViewIndex}
                            scrollToTabViewIndex={scrollToTabViewIndex}
                            scrollX={scrollX}
                            scrollToTop={scrollToTabViewTop}
                        />
                    </View>
                    <ItemDetailTabView
                        ref={tabViewRef}
                        tabViewIndex={tabViewIndex}
                        data={data.item}
                        scrollX={scrollX}
                    />
                </Animated.ScrollView>
                <UpFab
                    defaultOpacity={0}
                    animation={scrollToTabViewTopTarget > 0}
                    scrollY={scrollY}
                    inputRange={[0, scrollToTabViewTopTarget, scrollToTabViewTopTarget + 50]}
                    style={{ bottom: 80 + bottom + 16 }}
                    onPress={onFab}
                />
                <ItemDetailFooter
                    data={data.item}
                    onBuy={() => setOptionModalVisible(true)}
                />
                <ItemDetailOptionSheet
                    data={data.item}
                    visible={optionModalVisible}
                    onClose={() => setOptionModalVisible(false)}
                />
            </>}
        </View>
    )
}

export default ItemDetailScreen

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