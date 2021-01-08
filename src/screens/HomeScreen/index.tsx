import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Animated, View } from 'react-native'
import CategorySelector from '../../components/CategorySelector'
import HomeHeader from '../../components/Headers/HomeHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import UpFab from '../../components/UpFab'
import { STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import BestTab from './HomeScreenTabs/BestTab'
import HomeTab from './HomeScreenTabs/HomeTab'
import NewTab from './HomeScreenTabs/NewTab'
import HomeScreenTabSelector from './HomeScreenTabSelector'

const HomeScreen = () => {

    const scrollViewRef = useRef<ScrollView>(null)
    const [tabIndex, setTabIndex] = useState(0)
    const [scrollX] = useState(new Animated.Value(0))

    const onTabSelectorPress = useCallback((index: number) => { // 셀렉터 버튼 클릭시
        scrollViewRef.current?.scrollTo({ animated: true, x: WIDTH * index })
    }, [])

    const categoryTranslateY = scrollX.interpolate({
        inputRange: [0, WIDTH / 4 * 3, WIDTH, WIDTH / 4 * 5, WIDTH * 2],
        outputRange: [-48, -48, 0, -48, -48,]
    })

    return (
        <ScreenLayout >
            <HomeHeader />
            <HomeScreenTabSelector
                scrollX={scrollX}
                tabIndex={tabIndex}
                onPress={onTabSelectorPress}
            />
            <View style={styles.categoryContainer} >
                <Animated.View style={[{ transform: [{ translateY: categoryTranslateY }] }]} >
                    <CategorySelector />
                </Animated.View>
            </View>
            <Animated.ScrollView
                ref={scrollViewRef}
                scrollEventThrottle={16}
                horizontal
                overScrollMode='never'
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: true,
                        listener: ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
                            setTabIndex(Math.round(nativeEvent.contentOffset.x / WIDTH))
                        }
                    }
                )}
                showsHorizontalScrollIndicator={false}
            >
                <HomeTab />
                <BestTab />
                <NewTab />
            </Animated.ScrollView>

            <UpFab
                onPress={() => { }}
            />
        </ScreenLayout>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    categoryContainer: { position: 'absolute', top: 56 + 48 + STATUSBAR_HEIGHT, width: '100%', overflow: 'hidden', zIndex: 1 }
})
