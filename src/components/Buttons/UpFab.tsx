import React from 'react'
import { StyleSheet, ViewStyle, Animated } from 'react-native'
import TouchableScale from './TouchableScale'
import UpArrowIcon from '../Svgs/UpArrowIcon'

interface UpFabProps {
    onPress: () => void
    style?: ViewStyle
    scrollY?: Animated.Value
    inputRange?: number[]
    animation?: boolean,
    defaultOpacity?: number
}

const UpFab: React.FC<UpFabProps> = ({ onPress, style, scrollY, animation, inputRange, defaultOpacity }) => {

    const opacity = animation && inputRange && scrollY
        ? scrollY.interpolate({
            inputRange,
            outputRange: [0, 0, 1]
        })
        : defaultOpacity

    return (
        <Animated.View style={[{ opacity }, styles.container, style]}>
            <TouchableScale style={styles.btn} onPress={onPress}>
                <UpArrowIcon />
            </TouchableScale>
        </Animated.View>
    )
}

UpFab.defaultProps = {
    defaultOpacity: 1
}

export default UpFab

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    btn: {
        opacity: 0.9,
        backgroundColor: '#fff',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    }
})
