import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { GRAY, VERY_LIGHT_GRAY } from '../constants/styles'
import { IS_IOS } from '../constants/values'

const ActivityIndicatorView = () => {
    return (
        <View style={styles.container} >
            <ActivityIndicator size='small' color={IS_IOS ? GRAY : GRAY} />
        </View>
    )
}

export default ActivityIndicatorView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})