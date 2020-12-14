import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, View, Animated } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseButton from '../Buttons/BaseButton'
import { COLOR1, COLOR1_RGB, GRAY, GRAY_RGB, WIDTH, WITHE_RGB } from '../../constants/styles'
import BackArrowIcon from '../../components/Svgs/BackArrowIcon'
import LinearGradient from 'react-native-linear-gradient'
import CartIcon from '../Svgs/CartIcon'

interface ItemDetailHeaderProps {
    scrollY: Animated.Value
}

const ItemDetailHeader: React.FC<ItemDetailHeaderProps> = ({ scrollY }) => {

    const { goBack, navigate } = useNavigation()

    const onCart = useCallback(() => {
        navigate('Cart')
    }, [])

    const titleInterpolate = scrollY.interpolate({
        inputRange: [0, WIDTH - 56],
        outputRange: [0, 1]
    })

    const backArrowInterpolate = scrollY.interpolate({
        inputRange: [0, (WIDTH - 56) / 2],
        outputRange: [WITHE_RGB, GRAY_RGB],
        extrapolateRight: 'clamp'
    })

    const cartInterpolate = scrollY.interpolate({
        inputRange: [0, (WIDTH - 56) / 2],
        outputRange: [WITHE_RGB, COLOR1_RGB],
        extrapolateRight: 'clamp'
    })

    const backgroundInterpolate = scrollY.interpolate({
        inputRange: [0, WIDTH - 56],
        outputRange: [0, 1]
    })


    return (
        <View style={styles.container} >
            <LinearGradient
                style={styles.backgroundGradient}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                colors={['rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0)']}
            />
            <Animated.View style={[styles.background, { opacity: backgroundInterpolate }]} />
            <BaseButton
                onPress={goBack}
                style={styles.backContainer}
            >
                <BackArrowIcon fill={backArrowInterpolate} />
            </BaseButton>
            <View style={styles.titleContainer} >
                <Animated.Text
                    style={[styles.title, { opacity: titleInterpolate }]}
                >
                    {'상품정보'}
                </Animated.Text>
            </View>
            <BaseButton
                onPress={onCart}
                style={styles.cartContainer}
            >
                <CartIcon fill={cartInterpolate} />
            </BaseButton>
        </View>
    )
}

export default ItemDetailHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backgroundGradient: {
        width: '100%',
        height: 56,
        position: 'absolute',
    },
    background: {
        width: '100%',
        height: 56,
        position: 'absolute',
        backgroundColor: '#fff'
    },
    backContainer: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 1
    },
    title: {
        marginLeft: 16,
        fontSize: 20,
        fontFamily: 'BMJUA'
    },
    cartContainer: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    }
})