import React from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import { COLOR1, GRAY, VERY_LIGHT_GRAY, WIDTH } from '../constants/styles'
import BaseText from './BaseText'

interface TabSelectorProps {
    tabIndex: number
    onPress: (index: number) => void
    scrollX: Animated.Value
    labels: string[]
}

const TabSelector: React.FC<TabSelectorProps> = ({ scrollX, onPress, tabIndex, labels }) => {

    const translateX = scrollX.interpolate({
        inputRange: [0, WIDTH * (labels.length - 1)],
        outputRange: [0, WIDTH / labels.length * (labels.length - 1)]
    })

    return (
        <View style={styles.container} >
            {labels.map((label, index) =>
                <Pressable
                    style={styles.btn}
                    onPress={() => onPress(index)}
                >
                    <BaseText style={[styles.label, { color: tabIndex === index ? COLOR1 : GRAY }]} >{label}</BaseText>
                </Pressable>
            )}

            <Animated.View
                style={[
                    styles.indicator,
                    {
                        marginHorizontal: ((WIDTH / labels.length) - 64) / 2,
                        transform: [{ translateX }]
                    }
                ]}
            />
        </View>
    )
}

export default TabSelector

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        backgroundColor: '#fff'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 16
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        width: 64,
        height: 2,
        borderRadius: 1,
        backgroundColor: COLOR1,
    }
})
