import React, { useCallback, useEffect, useState } from 'react'
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import { COLOR1, GRAY, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'

interface ItemDetailTabViewNavigatorProps {
    index: number
    scrollToTabViewIndex: (index: number) => void
    scrollX: Animated.Value
    scrollToTop: () => void
}

const LABELS = ['상품정보', '리뷰', '주문정보', '문의']

const ItemDetailTabViewNavigator: React.FC<ItemDetailTabViewNavigatorProps> = ({ index, scrollToTabViewIndex, scrollX, scrollToTop }) => {

    const onPress = useCallback((i: number) => {
        scrollToTabViewIndex(i)
        scrollToTop()
    }, [index, scrollToTop, scrollToTabViewIndex])

    const indicatorOffset = scrollX.interpolate({
        inputRange: [0, WIDTH * 4],
        outputRange: [0, WIDTH]
    })

    return (
        <View style={styles.container} >
            {LABELS.map((v, i) =>
                <Pressable
                    key={v}
                    onPress={() => onPress(i)}
                    style={styles.itemContainer}
                >
                    <BaseText style={{ color: index === i ? COLOR1 : GRAY }} >{v}</BaseText>
                </Pressable>
            )}
            <Animated.View style={[styles.indicator, { transform: [{ translateX: indicatorOffset }] }]} />
        </View>
    )
}

export default ItemDetailTabViewNavigator

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    itemContainer: {
        flex: 1,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        width: 56,
        height: 2,
        borderRadius: 1,
        backgroundColor: COLOR1,
        position: 'absolute',
        bottom: 0,
        marginHorizontal: ((WIDTH / 4) - 56) / 2
    }
})