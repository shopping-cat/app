import React, { useEffect, useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR2, SPRING_CONFIG } from '../../constants/styles'
import useToast from '../../hooks/useToast'
import BaseText from '../Text/BaseText'


const Toast = () => {

    const [animation] = useState(new Animated.Value(0))
    const { message, show } = useToast()
    const { bottom } = useSafeAreaInsets()

    useEffect(() => {
        if (message === '') return
        Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
            ...SPRING_CONFIG
        }).start(() =>
            Animated.timing(animation, {
                toValue: 0,
                delay: 2000,
                duration: 300,
                useNativeDriver: true
            }).start(() => show(''))
        )
    }, [message])

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [400, 0]
    })

    const scale = animation.interpolate({
        inputRange: [0, 0.3, 1],
        outputRange: [0, 0, 1]
    })


    return (
        <Animated.View
            style={[
                styles.container,
                { bottom: bottom + 80 + 24 },
                { transform: [{ translateY }, { scale }] }
            ]}
            pointerEvents='none'
        >
            <BaseText style={styles.text} >{message}</BaseText>
        </Animated.View>
    )
}

export default Toast

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLOR2,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        position: 'absolute',
        alignSelf: 'center'
    },
    text: {
        color: '#fff',
    }
})