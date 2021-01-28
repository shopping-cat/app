import React, { useCallback, useRef, useState } from 'react'
import { Animated, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import TabSelector from '../../components/TabSelector'
import { WIDTH } from '../../constants/styles'
import MyReviewTab from './ReviewTabs/MyReviewTab'
import WriteReviewTab from './ReviewTabs/WriteReviewTab'

const ReviewScreen = () => {


    const tabScrollViewRef = useRef<ScrollView>(null)

    const [tabIndex, setTabIndex] = useState(0)
    const [scrollX] = useState(new Animated.Value(0))

    const onTabSelectorPress = useCallback((index: number) => {
        tabScrollViewRef.current?.scrollTo({ animated: true, x: WIDTH * index })
    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='리뷰' underLine={false} disableBtns />
            <TabSelector
                labels={['리뷰 쓰기', '내 리뷰']}
                tabIndex={tabIndex}
                onPress={onTabSelectorPress}
                scrollX={scrollX}
            />
            <Animated.ScrollView
                ref={tabScrollViewRef}
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
                <WriteReviewTab />
                <MyReviewTab />
            </Animated.ScrollView>
        </ScreenLayout>
    )
}

export default ReviewScreen

const styles = StyleSheet.create({})