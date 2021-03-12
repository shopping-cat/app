import React from 'react'
import { Animated, Pressable, StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import { COLOR1, GRAY, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'

interface HomeScreenTabSelectorProps {
    tabIndex: number
    onPress: (index: number) => void
    scrollX: Animated.Value
}

const HomeScreenTabSelector: React.FC<HomeScreenTabSelectorProps> = ({ scrollX, onPress, tabIndex }) => {

    const translateX = scrollX.interpolate({
        inputRange: [0, WIDTH * 2],
        outputRange: [0, WIDTH / 3 * 2]
    })

    return (
        <View style={styles.container} >
            <Pressable
                style={styles.btn}
                onPress={() => onPress(0)}
            >
                <BaseText style={[styles.label, { color: tabIndex === 0 ? COLOR1 : GRAY }]} >홈</BaseText>
            </Pressable>
            <Pressable
                style={styles.btn}
                onPress={() => onPress(1)}
            >
                <BaseText style={[styles.label, { color: tabIndex === 1 ? COLOR1 : GRAY }]} >베스트</BaseText>
            </Pressable>
            <Pressable
                style={styles.btn}
                onPress={() => onPress(2)}
            >
                <BaseText style={[styles.label, { color: tabIndex === 2 ? COLOR1 : GRAY }]} >신규</BaseText>
            </Pressable>
            <Animated.View style={[styles.indicator, { transform: [{ translateX }] }]} />
        </View>
    )
}

export default HomeScreenTabSelector

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
        fontSize: 18
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
        width: 64,
        marginHorizontal: ((WIDTH / 3) - 64) / 2,
        height: 2,
        borderRadius: 1,
        backgroundColor: COLOR1,
    }
})
