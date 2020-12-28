import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseText from '../../components/BaseText'
import TouchableScale from '../../components/Buttons/TouchableScale'
import { COLOR1, LIGHT_GRAY, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'

interface CartFooterProps {
    totalPrice: number
    active?: boolean
    onPress: () => void
}

const CartFooter: React.FC<CartFooterProps> = ({ totalPrice, active, onPress }) => {

    const { bottom } = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingBottom: bottom + 16, height: 80 + bottom }]} >
            <TouchableScale
                onPress={onPress}
                targetScale={0.8}
                contianerStyle={styles.btnContainer}
                style={[styles.btn, { backgroundColor: active ? COLOR1 : LIGHT_GRAY }]}
            >
                <BaseText style={styles.btnText} >{active ? moneyFormat(totalPrice) + '원 ' : ''}주문하기</BaseText>
            </TouchableScale>
        </View>
    )
}

export default CartFooter

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderTopColor: VERY_LIGHT_GRAY,
        borderTopWidth: 1,
        padding: 16
    },
    btnContainer: {
        width: '100%',
        height: 48,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flex: 1
    },
    btnText: {
        fontSize: 18,
        color: '#fff'
    }
})