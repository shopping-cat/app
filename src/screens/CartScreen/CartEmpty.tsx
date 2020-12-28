import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseText from '../../components/BaseText'
import TouchableScale from '../../components/Buttons/TouchableScale'
import { COLOR1, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'

const CartEmpty = () => {

    const { navigate } = useNavigation()
    const { bottom } = useSafeAreaInsets()

    const onShowItems = useCallback(() => {
        navigate('Home')
    }, [])

    return (
        <View style={[styles.container, { paddingBottom: 56 + bottom }]} >
            <Icon name='cart-outline' color={VERY_LIGHT_GRAY} size={100} />
            <BaseText style={styles.emptyText} >장바구니가 비어있어요</BaseText>
            <BaseText style={styles.fillNewText} >새로운 상품들로 채워주세요</BaseText>
            <TouchableScale
                onPress={onShowItems}
                style={styles.btn}
                targetScale={0.8}
            >
                <BaseText style={styles.btnText} >상품 보러가기</BaseText>
            </TouchableScale>
        </View>
    )
}

export default CartEmpty

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    emptyText: {
        fontSize: 20,
        marginTop: 24,
        marginBottom: 16
    },
    fillNewText: {
        fontSize: 16,
        color: LIGHT_GRAY,
        marginBottom: 24
    },
    btn: {
        width: 216,
        height: 48,
        borderRadius: 12,
        backgroundColor: COLOR1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnText: {
        color: '#fff',
        fontSize: 20
    }
})