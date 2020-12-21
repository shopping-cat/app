import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { STATUSBAR_HEIGHT } from '../../constants/styles'

const ScreenLayout: React.FC = ({ children }) => {
    return (
        <View style={{ flex: 1 }} >
            <StatusBar translucent barStyle='dark-content' />
            <View style={styles.statusBarBackground} />
            {children}
        </View>
    )
}

export default ScreenLayout

const styles = StyleSheet.create({
    statusBarBackground: {
        width: '100%',
        height: STATUSBAR_HEIGHT
    }
})
