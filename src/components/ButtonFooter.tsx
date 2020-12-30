import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../constants/styles'
import BaseText from './BaseText'
import TouchableScale from './Buttons/TouchableScale'

interface ButtonFooterProps {
    text: string
    onPress: () => void
    active: boolean
}

const ButtonFooter: React.FC<ButtonFooterProps> = ({ text, onPress, active }) => {

    const { bottom } = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingBottom: bottom + 16, height: 80 + bottom }]} >
            <TouchableScale
                onPress={onPress}
                targetScale={0.8}
                contianerStyle={styles.btnContainer}
                style={[styles.btn, { backgroundColor: active ? COLOR1 : LIGHT_GRAY }]}
            >
                <BaseText style={styles.btnText} >{text}</BaseText>
            </TouchableScale>
        </View>
    )
}

export default ButtonFooter

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        padding: 16,
        borderTopColor: VERY_LIGHT_GRAY,
        borderTopWidth: 1
    },
    btnContainer: {
        width: '100%',
        height: 48,
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        flex: 1
    },
    btnText: {
        fontSize: 18,
        color: '#fff'
    }
})