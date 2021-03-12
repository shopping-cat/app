import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../Text/BaseText'

const EmptyView = () => {
    return (
        <View style={styles.contianer} >
            <BaseText>비어있습니다</BaseText>
        </View>
    )
}

export default EmptyView

const styles = StyleSheet.create({
    contianer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})