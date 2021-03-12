import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { STATUSBAR_HEIGHT } from '../../constants/styles'

const StatusBarHeightView = () => {
    return (
        <View style={styles.container} />
    )
}

export default StatusBarHeightView

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: STATUSBAR_HEIGHT
    }
})
