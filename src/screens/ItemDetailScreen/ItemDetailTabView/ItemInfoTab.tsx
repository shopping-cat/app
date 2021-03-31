import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import BaseText from '../../../components/Text/BaseText';
import ThinLine from '../../../components/View/ThinLine';
import { GRAY, WIDTH } from '../../../constants/styles';
import { ItemDetail } from '../../../graphql/item';

const generateHtml = (content: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="width=320, initial-scale=${WIDTH / 980}">
    <title>Web View</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    ${content || ''}
  </body>
</html>
`

const ItemInfoTab: React.FC<ItemDetail> = ({ html, requireInformation }) => {

    const [height, setHeight] = useState(10000)

    const onWebViewMessage = useCallback((event: WebViewMessageEvent) => {
        setHeight(Number(event.nativeEvent.data) * WIDTH / 980)
    }, [])

    return (
        <View style={styles.container} >
            <WebView
                source={{ html: generateHtml(html) }}
                style={[styles.webview, { height }]}
                onMessage={onWebViewMessage}
                injectedJavaScript='setTimeout(() => { window.ReactNativeWebView.postMessage(document.body.scrollHeight) }, 500)'
                showsVerticalScrollIndicator={false}
                cacheEnabled={true}
                startInLoadingState={true}
                scrollEnabled={false}
            />
            <ThinLine />
            <View style={styles.baseInfoContainer} >
                <BaseText style={styles.baseInfoTitle} >필수표기정보</BaseText>
                {(requireInformation?.data || []).map(({ content, title }) =>
                    <View key={title} style={styles.baseInfoContentContainer} >
                        <BaseText style={styles.baseInfoContentTitle} >{title}</BaseText>
                        <BaseText style={styles.baseInfoContent} >{content}</BaseText>
                    </View>
                )}
            </View>
        </View>
    )
}

export default ItemInfoTab

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        alignItems: 'center'
    },
    webview: {
        width: WIDTH - 32,
        marginVertical: 16
    },
    baseInfoContainer: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    baseInfoTitle: {
        fontSize: 16
    },
    baseInfoContentContainer: {
        marginTop: 16,
        flexDirection: 'row'
    },
    baseInfoContentTitle: {
        fontSize: 12,
        color: GRAY,
        width: 100,
        marginRight: 16,
        lineHeight: 16
    },
    baseInfoContent: {
        fontSize: 12,
        flex: 1,
        lineHeight: 16
    }
})