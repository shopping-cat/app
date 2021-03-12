import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR1, COLOR2, GRAY } from '../../constants/styles'
import BaseText from '../Text/BaseText'

const EmptyView = () => {
    return (
        <View
            style={styles.contianer}
            pointerEvents='none'
        >
            <BaseText style={styles.text} >비어있습니다</BaseText>
        </View>
    )
}

export default EmptyView

const styles = StyleSheet.create({
    contianer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    text: {
        fontSize: 20,
        color: GRAY
    }
})