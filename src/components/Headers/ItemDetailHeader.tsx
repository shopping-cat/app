import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, View, Animated, StatusBar } from 'react-native'
import BaseButton from '../Buttons/BaseButton'
import { COLOR1, COLOR1_RGB, GRAY, GRAY_RGB, STATUSBAR_HEIGHT, WIDTH, WITHE_RGB } from '../../constants/styles'
import BackArrowIcon from '../../components/Svgs/BackArrowIcon'
import CartIcon from '../Svgs/CartIcon'
import LinearGradient from 'react-native-linear-gradient'

interface ItemDetailHeaderProps {
    scrollY: Animated.Value
    itemDetailInfoHeight: number
}

const HeaderHeight = 56 + STATUSBAR_HEIGHT


const ItemDetailHeader: React.FC<ItemDetailHeaderProps> = ({ scrollY, itemDetailInfoHeight }) => {

    const { goBack, navigate } = useNavigation()

    const startPos = WIDTH - HeaderHeight
    const endPos = itemDetailInfoHeight - HeaderHeight
    const inputRange = [0, startPos, startPos > endPos ? startPos : endPos]

    const onCart = useCallback(() => {
        navigate('Cart')
    }, [])

    const titleInterpolate = scrollY.interpolate({
        inputRange,
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
    })

    const backArrowInterpolate = scrollY.interpolate({
        inputRange,
        outputRange: [WITHE_RGB, WITHE_RGB, GRAY_RGB],
        extrapolate: 'clamp'
    })

    const cartInterpolate = scrollY.interpolate({
        inputRange,
        outputRange: [WITHE_RGB, WITHE_RGB, COLOR1_RGB],
        extrapolate: 'clamp'
    })

    const backgroundInterpolate = scrollY.interpolate({
        inputRange,
        outputRange: [0, 0, 1],
        extrapolate: 'clamp'
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
        height: HeaderHeight,
        paddingTop: STATUSBAR_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1
    },
    backgroundGradient: {
        width: '100%',
        height: 56 + STATUSBAR_HEIGHT,
        position: 'absolute',
    },
    background: {
        width: '100%',
        height: HeaderHeight,
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