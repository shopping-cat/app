import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Animated, View, FlatList } from 'react-native'
import CategorySelector from '../../components/Layouts/CategorySelector'
import HomeHeader from '../../components/Headers/HomeHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import UpFab from '../../components/Buttons/UpFab'
import { STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import { Category } from '../../constants/types'
import BestTab from './HomeScreenTabs/BestTab'
import HomeTab from './HomeScreenTabs/HomeTab'
import NewTab from './HomeScreenTabs/NewTab'
import HomeScreenTabSelector from './HomeScreenTabSelector'

const HomeScreen = () => {

    const scrollViewRef = useRef<ScrollView>(null)
    const homeFlatlistRef = useRef<FlatList>(null)
    const bestFlatlistRef = useRef<FlatList>(null)
    const newFlatlistRef = useRef<FlatList>(null)

    const [tabIndex, setTabIndex] = useState(0)
    const [scrollX] = useState(new Animated.Value(0))

    const onTabSelectorPress = useCallback((index: number) => { // 셀렉터 버튼 클릭시
        scrollViewRef.current?.scrollTo({ animated: true, x: WIDTH * index })
    }, [])

    const goUp = useCallback(() => {
        if (tabIndex === 0) homeFlatlistRef.current?.scrollToOffset({ offset: 0, animated: true })
        if (tabIndex === 1) bestFlatlistRef.current?.scrollToOffset({ offset: 0, animated: true })
        if (tabIndex === 2) newFlatlistRef.current?.scrollToOffset({ offset: 0, animated: true })
    }, [tabIndex])


    return (
        <ScreenLayout >
            <HomeHeader />
            <HomeScreenTabSelector
                scrollX={scrollX}
                tabIndex={tabIndex}
                onPress={onTabSelectorPress}
            />
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
                <HomeTab ref={homeFlatlistRef} />
                <BestTab ref={bestFlatlistRef} />
                <NewTab ref={newFlatlistRef} />
            </Animated.ScrollView>
            <UpFab onPress={goUp} />
        </ScreenLayout>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

})
