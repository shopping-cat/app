import React from 'react'
import { StyleSheet, Text, View, ViewStyle } from 'react-native'
import TouchableScale from './Buttons/TouchableScale'
import UpArrowIcon from './Svgs/UpArrowIcon'

interface UpFabProps {
    onPress: () => void
    style?: ViewStyle
}

const UpFab: React.FC<UpFabProps> = ({ onPress, style }) => {
    return (
        <TouchableScale
            onPress={onPress}
            style={[styles.container, style]}
        >
            <UpArrowIcon />
        </TouchableScale>
    )
}

export default UpFab

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#fff',
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.7,
        elevation: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    }
})
