import React from 'react'
import { StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'

const PrivacyPolicyScreen = () => {
    return (
        <ScreenLayout>
            <DefaultHeader title='개인정보 처리방침' disableBtns />
            <WebView
                source={{ uri: 'https://www.shopping-cat.kr/privacy' }}
                style={styles.webview}
            />
        </ScreenLayout>
    )
}

export default PrivacyPolicyScreen

const styles = StyleSheet.create({
    webview: {

    }
})
