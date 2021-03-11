import React, { useEffect, useState } from 'react'
import { StyleSheet, Animated, View, StyleProp, ViewStyle, Easing, EasingFunction } from 'react-native'
import { COLOR1 } from '../constants/styles'


const size = 8
const spac = 6
const number = 4
const color = COLOR1
const totalDuration = 1500
const delay = 200
const Y = 10
const itemDuration = 1100
const translateYSpring = 3
const easing = Easing.linear


const Loading = () => {

    const [animation] = useState(new Animated.Value(0))


    const runAnimation = () => {
        animation.setValue(0)
        Animated.timing(animation, {
            useNativeDriver: true,
            toValue: 1,
            duration: totalDuration,
            easing: easing,
            delay: delay
        }).start(() => runAnimation())
    }

    useEffect(() => {
        runAnimation()
    }, [])




    return (
        <View style={[styles.container]} >
            <Ball index={0} animation={animation} />
            <Ball index={1} animation={animation} />
            <Ball index={2} animation={animation} />
            <Ball index={3} animation={animation} />
        </View>
    )
}

const Ball = ({ index, animation }: { index: number, animation: Animated.Value }) => {

    const start = (totalDuration - itemDuration) / (number - 1) * index
    const inputRange = [start / totalDuration]
    for (let i = 1; i < 9; i++) {
        inputRange.push((itemDuration * i / 8 + start) / totalDuration)
    }
    const translateY = animation.interpolate({
        inputRange,
        outputRange: [0, 0, -Y, 0, Y, 0, translateYSpring, 0, 0],
    })

    return <Animated.View key={index} style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: size / 2,
        marginLeft: index == 0 ? 0 : spac,
        transform: [{ translateY }]
    }}
    />
}


export default Loading

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
