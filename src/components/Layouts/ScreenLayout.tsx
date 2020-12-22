import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { STATUSBAR_HEIGHT } from '../../constants/styles'

interface ScreenLayoutProps {
    disableStatusbarHeight?: boolean
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, disableStatusbarHeight }) => {
    return (
        <View style={{ flex: 1 }} >
            <StatusBar translucent backgroundColor={disableStatusbarHeight && 'transparent'} barStyle='dark-content' />
            {!disableStatusbarHeight && <View style={styles.statusBarBackground} />}
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
