import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { COLOR1, COLOR2 } from '../../constants/styles'
import { useCartItems } from '../../graphql/cartItem'
import BaseText from '../BaseText'
import CartIcon from '../Svgs/CartIcon'

interface CartButtonProps {
    color?: string | Animated.AnimatedInterpolation
}

const CartButton: React.FC<CartButtonProps> = ({ color }) => {

    const { navigate } = useNavigation()

    const { data } = useCartItems()

    const onCart = useCallback(() => {
        navigate('Cart')
    }, [])

    return (
        <Pressable
            onPress={onCart}
            style={styles.container}
        >
            <CartIcon fill={color || COLOR1} />
            {(data && data.cartItems.length > 0) &&
                <Animated.View style={styles.badge} >
                    <BaseText style={styles.badgeText} >{data.cartItems.length > 99 ? 99 : data.cartItems.length}</BaseText>
                </Animated.View>
            }
        </Pressable>
    )
}

export default CartButton

const styles = StyleSheet.create({
    container: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    badge: {
        width: 15,
        height: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        backgroundColor: COLOR2,
        position: 'absolute',
        top: 13,
        right: 13
    },
    badgeText: {
        color: '#fff',
        fontSize: 11
    }
})
