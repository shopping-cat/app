import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Animated, ScrollView, View } from 'react-native'
import ItemInfoTab from './ItemInfoTab'
import ReviewTab from './ReviewTab'
import OrderInfoTab from './OrderInfoTab'
import InqueryTab from './InqueryTab'
import { HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../../../constants/styles'
import { ItemDetail } from '../../../graphql/item'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ItemDetailTabViewProps {
    scrollX: Animated.Value
    data: ItemDetail
    tabViewIndex: number
}


const ItemDetailTabView = React.forwardRef<ScrollView, ItemDetailTabViewProps>(({ scrollX, data, tabViewIndex }, ref) => {

    const { bottom } = useSafeAreaInsets()

    const [height] = useState(new Animated.Value(0))
    const [heights, setHeights] = useState([0, 0, 0, 0])

    const minHeight = HEIGHT - STATUSBAR_HEIGHT - 56 - 40 - 80 - bottom

    const onLayout = useCallback((height: number, index: number) => {
        setHeights(heights.map((v, i) => i === index ? height : v))
    }, [heights])

    useEffect(() => {
        Animated.timing(height, {
            toValue: heights[tabViewIndex] < minHeight ? minHeight : heights[tabViewIndex],
            duration: 500,
            useNativeDriver: false
        }).start()
    }, [tabViewIndex, heights])

    return (
        <Animated.ScrollView
            ref={ref}
            overScrollMode='never'
            scrollEventThrottle={16}
            horizontal
            style={[styles.scrollView, { height }]}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
            )}
        >
            <View style={{ width: WIDTH }} >
                <View style={{ position: 'absolute' }} onLayout={({ nativeEvent }) => onLayout(nativeEvent.layout.height, 0)} >
                    <ItemInfoTab {...data} />
                </View>
            </View>
            <View style={{ width: WIDTH }} >
                <View style={{ position: 'absolute' }} onLayout={({ nativeEvent }) => onLayout(nativeEvent.layout.height, 1)}  >
                    <ReviewTab {...data} />
                </View>
            </View>
            <View style={{ width: WIDTH }} >
                <View style={{ position: 'absolute' }} onLayout={({ nativeEvent }) => onLayout(nativeEvent.layout.height, 2)}  >
                    <OrderInfoTab />
                </View>
            </View>
            <View style={{ width: WIDTH }} >
                <View style={{ position: 'absolute' }} onLayout={({ nativeEvent }) => onLayout(nativeEvent.layout.height, 3)}  >
                    <InqueryTab {...data} />
                </View>
            </View>
        </Animated.ScrollView>
    )
})

export default ItemDetailTabView

const styles = StyleSheet.create({
    scrollView: {
        width: WIDTH,
    }
})
