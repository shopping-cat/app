import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, { Easing } from 'react-native-reanimated'
import { HEIGHT, WIDTH } from '../constants/styles'

const { set, cond, block, eq, lessThan, clockRunning, Clock, spring, startClock, Value, stopClock, concat, multiply, timing, useCode } = Animated

const returnTo0 = (clock: any, value: any) => {
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0)
    };

    const config = {
        damping: 10,
        mass: 0.4,
        stiffness: 121.6,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: new Value(0)
    };

    return [
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.position, value),
            set(config.toValue, 0),
            startClock(clock)
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position
    ];
}

interface BottomSheetProps {
    visible: boolean
    onClose: () => void
    render: () => React.ReactNode
}

const BottomSheet: React.FC<BottomSheetProps> = ({ onClose, visible, render }) => {

    const [isRendering, setIsRendering] = useState(false)
    const [onOffAnimation] = useState(new Value(1))
    const [draggAnimation] = useState(new Value<number>(0))
    const [draggState] = useState(new Value(State.UNDETERMINED))
    const [draggClock] = useState(new Clock())
    const [contentHeight, setContentHeight] = useState(0)


    useEffect(() => {
        if (visible) setIsRendering(true)
        timing(onOffAnimation, {
            duration: 250,
            easing: Easing.inOut(Easing.ease),
            toValue: visible ? 1 : 0
        }).start(() => setIsRendering(visible))
    }, [visible])

    useCode(() => block([
        cond(
            eq(draggState, State.ACTIVE),
            [
                //clamp
                cond(lessThan(draggAnimation, 0), set(draggAnimation, 0)),
                stopClock(draggClock)
            ],
            [
                set(
                    draggAnimation,
                    returnTo0(
                        draggClock,
                        cond(lessThan(draggAnimation, 0), 0, draggAnimation) //clamp
                    )
                )
            ]
        )
    ]), [])

    const translateY = onOffAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [contentHeight, 0]
    })




    return (
        <View
            style={[
                styles.container,
                // 렌더링을 유지해야 content height를 딜레이 없이 받을수 있어서 아예 삭제 하지말고 스케일 0 으로 숨깁니다
                { transform: [{ scale: isRendering ? 1 : 0 }] }
            ]}
        >

            <Animated.View
                style={[
                    styles.background,
                    { opacity: onOffAnimation }
                ]}
            />
            <Animated.View
                style={[styles.movableContainer, { transform: [{ translateY }] }]}
            >
                <Animated.View
                    style={[
                        styles.movableContainer,
                        { transform: [{ translateY: draggAnimation }], }
                    ]}
                >
                    <Pressable
                        style={styles.backdrop}
                        onPress={onClose}
                    />
                    <PanGestureHandler
                        onGestureEvent={({ nativeEvent }) => {
                            console.log(nativeEvent.translationY)
                            draggAnimation.setValue(nativeEvent.translationY)
                            draggState.setValue(nativeEvent.state)
                        }}
                        onHandlerStateChange={({ nativeEvent }) => {
                            draggAnimation.setValue(nativeEvent.translationY)
                            draggState.setValue(nativeEvent.state)
                        }}
                    >
                        <View
                            style={{ height: 56, backgroundColor: 'blue' }}
                        />
                    </PanGestureHandler>
                    <View
                        onLayout={({ nativeEvent }) => setContentHeight(nativeEvent.layout.height)}
                        style={styles.contentContainer}
                    >
                        {render()}
                    </View>

                </Animated.View>
                <View style={styles.bottomSpringSafeView} />
            </Animated.View>
        </View>
    )
}

export default BottomSheet

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        zIndex: 99
    },
    background: {
        position: 'absolute',
        left: 0, right: 0, top: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    movableContainer: {
        position: 'absolute',
        width: WIDTH,
        height: HEIGHT
    },
    backdrop: {
        flex: 1
    },
    contentContainer: {
        maxHeight: HEIGHT
    },
    bottomSpringSafeView: { backgroundColor: '#fff', height: 20, position: 'absolute', bottom: 0, width: WIDTH, zIndex: -1 }
})