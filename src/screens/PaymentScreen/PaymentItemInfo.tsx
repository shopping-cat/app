import React, { useCallback, useEffect, useState } from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import PaymentItemCard from '../../components/Cards/PaymentItemCard'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import ThinLine from '../../components/View/ThinLine'
import { SPRING_CONFIG, VERY_LIGHT_GRAY } from '../../constants/styles'
import { OrderCalculate } from '../../graphql/order'

interface PaymentItemInfoProps {
    data: OrderCalculate
}

const PaymentItemInfo: React.FC<PaymentItemInfoProps> = ({ data }) => {

    const [open, setOpen] = useState(false)
    const [animation] = useState(new Animated.Value(0))
    const [contentsHeight, setContentsHeight] = useState(0)

    const onPress = useCallback(() => {
        if (!open) Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: false,
            ...SPRING_CONFIG
        }).start()
        else Animated.timing(animation, {
            toValue: 0,
            useNativeDriver: false,
            duration: 250
        }).start()
        setOpen(!open)
    }, [open])

    const height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [64, contentsHeight + 64]
    })

    return (
        <Animated.View style={[styles.container, { height }]} >
            <Pressable
                onPress={onPress}
                style={styles.titleContainer}
            >
                <BaseText style={styles.title}  >주문상품 총 {data.orderItems.length}개</BaseText>
                <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }} >
                    <DownArrowIcon fill='#000' />
                </View>
            </Pressable>
            <View
                style={styles.contentContainer}
                onLayout={({ nativeEvent }) => setContentsHeight(nativeEvent.layout.height)}
            >
                <ThinLine />
                {data.orderItems.map((item) => <PaymentItemCard key={item.id} {...item} />)}
                <ThinLine />
            </View>
            <View style={styles.bottomLine} />
        </Animated.View>
    )
}

export default PaymentItemInfo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        overflow: 'hidden'
    },
    titleContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 64,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18
    },
    contentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0, right: 0,
        zIndex: -1
    },
    bottomLine: { width: '100%', height: 1, backgroundColor: VERY_LIGHT_GRAY, position: 'absolute', bottom: 0 }
})