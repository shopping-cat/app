import React from 'react'
import { StyleSheet } from 'react-native'
import WebView from 'react-native-webview'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'

const OrderCancelGuide = () => {
    return (
        <ScreenLayout>
            <DefaultHeader title='주문취소/교환/환불 안내' disableBtns />
            <WebView
                source={{ uri: 'https://www.shoppingcat.kr/orderCancelInfo' }}
                style={styles.webview}
            />
        </ScreenLayout>
    )
}

export default OrderCancelGuide

const styles = StyleSheet.create({
    webview: {

    }
})
