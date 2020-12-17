import React, { useCallback, useEffect, useState } from 'react'
import { BackHandler, NativeEventSubscription, Pressable, StyleSheet, Text, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import { HEIGHT, STATUSBAR_HEIGHT, WIDTH } from '../constants/styles'

const { set, cond, block, eq, clockRunning, Clock, spring, startClock, Value, stopClock, greaterThan, call, useCode, sub, not } = Animated

const runSpring = (clock: any, value: any, toValue: any) => {
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

interface BottomSheetProps {
    visible: boolean
    onClose: () => void
    render: () => React.ReactNode
    draggAbleHeaderRender?: () => React.ReactNode
}

const BottomSheet: React.FC<BottomSheetProps> = ({ onClose, visible, render, draggAbleHeaderRender }) => {

    const [openClock] = useState(new Clock())
    const [closeClock] = useState(new Clock())
    const [animation] = useState(new Value(0))
    const [draggAnimation] = useState(new Value<number>(0))
    const [draggState] = useState(new Value(State.UNDETERMINED))
    const [visibleAnimation] = useState(new Value<number>(0))
    const [contentHeight, setContentHeight] = useState(0)
    const [renderd, setRenderd] = useState(false) //첫 로드때 안보이게 하기위한 변수

    useEffect(() => {
        let backHandler: NativeEventSubscription
        // 초기화
        if (visible) {
            // 안드로이드 뒤로가기 버튼 클릭시 바텀시트 닫힘
            backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                onClose()
                return true
            })
            draggAnimation.setValue(0) // 값 초기화
            animation.setValue(0)
            draggState.setValue(State.UNDETERMINED)
            visibleAnimation.setValue(1)

            setRenderd(true)
        } else {
            // stopClock(clock)
            visibleAnimation.setValue(0)
        }
        return () => {
            // 안드로이드 뒤로가기 리스더 삭제
            backHandler && backHandler.remove()
        }
    }, [visible])

    useCode(() => block([
        cond(eq(visibleAnimation, new Value(1)),
            [
                stopClock(closeClock),
                cond(
                    eq(draggState, State.ACTIVE),
                    [
                        stopClock(openClock),
                        cond(
                            greaterThan(draggAnimation, 0), //clamp
                            set(animation, sub(contentHeight, draggAnimation))
                        )
                    ],
                    [
                        // onChange()
                        cond(
                            greaterThan(draggAnimation, new Value(contentHeight / 2)), // 드래그를 반 이상 했을때
                            [

                                call([], onClose), // on change 로 수정해줘야 하나 // 닫기
                            ],
                            set( // 다시 원상복귀
                                animation,
                                runSpring(
                                    openClock,
                                    animation,
                                    contentHeight
                                )
                            )
                        )
                    ]
                ),
            ],
            [
                stopClock(openClock),
                set(
                    animation,
                    runSpring(
                        closeClock,
                        animation,
                        0
                    )
                )
            ]
        )
    ]), [contentHeight])

    const translateY = animation.interpolate({
        inputRange: [0, contentHeight],
        outputRange: [contentHeight, 0]
    })

    const opacity = animation.interpolate({
        inputRange: [0, contentHeight],
        outputRange: [0, 1]
    })


    return (
        <View
            // visible일때 zindex 맨 앞에 있어도 뒤에 ui들 클릭 받아지게 설정
            // visible === false 라도 contentHeight를 유지해야해서 unmount 할수는 없음
            pointerEvents={visible ? 'auto' : 'none'}
            style={[styles.container, { opacity: renderd ? 1 : 0 }]}
        >
            <Animated.View
                // backdrop
                style={[
                    styles.background,
                    { opacity }
                ]}
            />
            <Animated.View
                style={[styles.movableContainer, { transform: [{ translateY }] }]}
            >
                <Pressable
                    style={styles.backdrop}
                    onPress={onClose}
                />
                <View
                    onLayout={({ nativeEvent }) => setContentHeight(nativeEvent.layout.height)}
                    style={styles.contentContainer}
                >
                    <PanGestureHandler
                        onGestureEvent={({ nativeEvent }) => {
                            draggAnimation.setValue(nativeEvent.translationY)
                            draggState.setValue(nativeEvent.state)
                        }}
                        onHandlerStateChange={({ nativeEvent }) => {
                            draggAnimation.setValue(nativeEvent.translationY)
                            draggState.setValue(nativeEvent.state)
                        }}
                    >
                        <View>
                            <View style={styles.extraPanHandler} />
                            {draggAbleHeaderRender ? draggAbleHeaderRender() : null}
                        </View>
                    </PanGestureHandler>
                    {render()}
                </View>
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
        left: 0, right: 0, top: 0, bottom: 0,
    },
    backdrop: {
        flex: 1
    },
    contentContainer: {
        maxHeight: '100%',
    },
    bottomSpringSafeView: {
        backgroundColor: '#fff',
        height: 50,
        position: 'absolute',
        bottom: 0,
        width: WIDTH,
        zIndex: -99,
        transform: [{ translateY: 40 }]
    },
    extraPanHandler: {
        width: '100%',
        height: STATUSBAR_HEIGHT
    }
})