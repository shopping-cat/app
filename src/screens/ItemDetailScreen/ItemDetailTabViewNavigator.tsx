import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import BaseText from '../../components/BaseText'
import TouchableScale from '../../components/Buttons/TouchableScale'
import { COLOR1, GRAY, STATUSBAR_HEIGHT, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'

interface ItemDetailTabViewNavigatorProps {
    index: number
    setIndex: (v: number) => void
}

const LABELS = ['상품정보', '리뷰', '주문정보', '문의']

const ItemDetailTabViewNavigator: React.FC<ItemDetailTabViewNavigatorProps> = ({ index, setIndex }) => {

    const [indicatorOffset] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(indicatorOffset, {
            duration: 150,
            easing: Easing.linear,
            toValue: WIDTH / 4 * index,
        }).start()

    }, [index])

    return (
        <View style={styles.container} >
            {LABELS.map((v, i) =>
                <Pressable
                    onPress={() => setIndex(i)}
                    style={styles.itemContainer}
                >
                    <BaseText style={{ color: index === i ? COLOR1 : GRAY }} >{v}</BaseText>
                </Pressable>
            )}
            <Animated.View style={[styles.indicator, { left: indicatorOffset }]} />
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
        alignItems: 'center'
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