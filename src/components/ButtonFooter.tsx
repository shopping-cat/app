import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../constants/styles'
import BaseText from './BaseText'
import TouchableScale from './Buttons/TouchableScale'

interface ButtonFooterProps {
    text: string
    onPress: () => void
    active: boolean
    disableTopLine?: boolean
    loading?: boolean
}

const ButtonFooter: React.FC<ButtonFooterProps> = ({ text, onPress, active, disableTopLine, loading }) => {

    const { bottom } = useSafeAreaInsets()

    return (
        <View style={[
            styles.container,
            {
                paddingBottom: bottom + 16, height: 80 + bottom,
                borderTopWidth: disableTopLine ? 0 : 1
            },
        ]} >
            <TouchableScale
                onPress={onPress}
                targetScale={0.8}
                contianerStyle={styles.btnContainer}
                style={[styles.btn, { backgroundColor: active ? COLOR1 : LIGHT_GRAY }]}
            >
                <BaseText style={styles.btnText} >{text}</BaseText>
                {loading && <ActivityIndicator
                    style={styles.loading}
                    color='#fff'
                    size='small'
                />}
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
    },
    loading: {
        position: 'absolute',
        right: 16
    }
})
