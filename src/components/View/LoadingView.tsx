import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { GRAY } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import TossLoading from '../Loading/Loading'

const LoadingView = () => {
    return (
        <View style={styles.container} >
            <TossLoading />
        </View>
    )
}

export default LoadingView

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

