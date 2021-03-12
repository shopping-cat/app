import React, { ReactNode, useState } from 'react'
import { Pressable, StyleProp, StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { VERY_LIGHT_GRAY } from '../../constants/styles'
import { SPRING_CONFIG } from '../../constants/styles'
import BaseText from '../Text/BaseText'

const { set, cond, block, eq, clockRunning, Clock, spring, startClock, Value, stopClock, greaterThan, call, useCode, sub, not } = Animated

interface AccordianProps {
    title: string
    contents: { left: string, right: string }[]
    style?: StyleProp<ViewStyle>
    titleContainerStyle?: StyleProp<ViewStyle>
    contentContainerStyle?: StyleProp<ViewStyle>
    selectedTitle?: string | null
    onSelect?: (index: number) => void
}

const runSpring = (clock: any, value: any, toValue: any) => {
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0)
    };

    const config = {
        ...SPRING_CONFIG,
        toValue: new Value(0)
    };

    return [
        cond(not(clockRunning(clock)), [
            set(state.finished, 0),
            set(state.position, value),
            set(config.toValue, toValue),
            startClock(clock)
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position
    ];
}

const Accordian: React.FC<AccordianProps> = ({ selectedTitle, title, contents, onSelect, style, titleContainerStyle, contentContainerStyle }) => {

    const [open] = useState(new Value<1 | 0>(0))
    const [openClock] = useState(new Clock())
    const [closeClock] = useState(new Clock())
    const [animation] = useState(new Value(0))
    const [titleHeight, setTitleHeight] = useState(0)
    const [contentsHeight, setContentsHeight] = useState(0)

    useCode(() => block([
        cond(
            open,
            [
                stopClock(closeClock),
                set(
                    animation,
                    runSpring(openClock, animation, contentsHeight)
                )
            ],
            [
                stopClock(openClock),
                set(
                    animation,
                    runSpring(closeClock, animation, 0)
                )
            ]
        )
    ]), [contentsHeight])

    const height = animation.interpolate({
        inputRange: [0, contentsHeight],
        outputRange: [titleHeight, contentsHeight + titleHeight + 2] // +2는 contentStyle의 border이 가려지기때문에 추가했습니다
    })

    return (
        <Animated.View
            style={[
                style,
                styles.container,
                { height }
            ]}
        >
            <Pressable
                onPress={() => open.setValue(1)}
                style={[titleContainerStyle, styles.titleContainer]}
                onLayout={({ nativeEvent }) => setTitleHeight(nativeEvent.layout.height)}
            >
                <BaseText>{selectedTitle || title}</BaseText>
            </Pressable>
            <View
                style={[styles.contentsContainer]}
                onLayout={({ nativeEvent }) => setContentsHeight(nativeEvent.layout.height)}
            >
                {contents.map(({ left, right }, index) =>
                    <Pressable
                        key={left + right}
                        onPress={() => {
                            onSelect && onSelect(index)
                            open.setValue(0)
                        }}
                        style={[contentContainerStyle, styles.contentContainer]}
                    >
                        <BaseText>{left}</BaseText>
                        <BaseText>{right}</BaseText>
                    </Pressable>
                )}
            </View>
        </Animated.View>
    )
}

export default Accordian

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        overflow: 'hidden'
    },
    titleContainer: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#fff'
    },
    contentsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0, right: 0,
        zIndex: -1
    },
    contentContainer: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderTopColor: VERY_LIGHT_GRAY,
        borderTopWidth: 1
    }
})