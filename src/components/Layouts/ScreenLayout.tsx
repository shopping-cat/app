import React from 'react'
import { StatusBar, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import { STATUSBAR_HEIGHT } from '../../constants/styles'

interface ScreenLayoutProps {
    disableStatusbarHeight?: boolean
    style?: StyleProp<ViewStyle>
}

const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children, disableStatusbarHeight, style }) => {
    return (
        <View style={[styles.container, style]} >
            <StatusBar translucent backgroundColor={disableStatusbarHeight ? 'transparent' : undefined} barStyle='dark-content' />
            {!disableStatusbarHeight && <View style={styles.statusBarBackground} />}
            {children}
        </View>
    )
}

export default ScreenLayout

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    statusBarBackground: {
        width: '100%',
        height: STATUSBAR_HEIGHT
    }
})
