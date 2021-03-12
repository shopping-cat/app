import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import BaseText from '../../../components/Text/BaseText';
import ThinLine from '../../../components/View/ThinLine';
import { GRAY, WIDTH } from '../../../constants/styles';
import { ItemDetail } from '../../../graphql/item';

const dummyRequiredInformation = [
    {
        "title": "품명 및 모델명",
        "content": "iti 캣 치킨 앤 연어 1kg (200g*5개)"
    },
    {
        "title": "인증사항",
        "content": "해당없음"
    },
    {
        "title": "제조국 또는 원산지",
        "content": "뉴질랜드"
    },
    {
        "title": "제조사/수입자",
        "content": "아이티아이/(주)산시아코리아"
    },
    {
        "title": "소비자상담 관련 전화번호",
        "content": "02-1234-3424"
    },
    {
        "title": "브랜드",
        "content": "iti"
    },
    {
        "title": "중량",
        "content": "1kg"
    },
    {
        "title": "원료구성",
        "content": "닭고기, 연어, 닭의간, 완두콩, 식물성글리세린, 녹색입홍합, 치커리, 파슬리, 아마씨, 다시마, 소금, 탄산칼슘, 염화콜린, 토코페롤, 타우린, 철산화아연, 닭고기, 연어, 닭의간, 완두콩, 식물성글리세린, 녹색입홍합, 치커리, 파슬리 ,아마씨, 다시마, 소금, 탄산칼슘, 염화콜린, 토코페롤, 타우린, 철산화아연"
    }
]

const html = `
<div>
<div style="text-align: center;"><img src="https://exit.ohou.se/9bd0f31a5726f016f0bbdd95f967461b0e038e62/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_01.jpg"> <img src="https://exit.ohou.se/37b6a162a71ada5869585bd899b44e24de48b0f9/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_02.jpg"> <img src="https://exit.ohou.se/b90474e20bc928d40d61101b4611b7e7c41a5d2d/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_03.jpg"> <img src="https://exit.ohou.se/36c33008171eb9c652419f70b86c5c7376dc8f97/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_04.jpg"> <img src="https://exit.ohou.se/5b37613676780884b419431945973283a9aec084/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_05.jpg"> <img src="https://exit.ohou.se/e5648ddfb6d6fe38018ad43a566feff388364b9d/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_06.jpg"> <img src="https://exit.ohou.se/1e5a751de08050938e873adf16584c604519496c/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_shortcattower_07-1.jpg"> <img src="https://exit.ohou.se/1d890c1d002fb1a83ce68f35d00c950d53aa6e35/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_07.jpg"> <img src="https://exit.ohou.se/99773fac129c472de343fa7b113e30655ab0812c/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_08.jpg"> <img src="https://exit.ohou.se/7d5144982c530f172ff1cb4489d626c0cee5ee30/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_09.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/786e6cc80e3c1ae20f1e5219b00d7270b8b19be7/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_010.jpg"> <iframe src="https://www.youtube.com/embed/DLc_8KJypLQ" frameborder="0" width="650" height="366"></iframe> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/7e35b81ef394dbc2718ee845629711031a6a5381/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_011.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/29042d535df1790a076e29271ed5d2c8b8b5173d/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_012.jpg"> <iframe src="https://www.youtube.com/embed/rh7OlpGwKL4" frameborder="0" width="650" height="366"></iframe> <iframe src="https://www.youtube.com/embed/AAj9UNP453g" frameborder="0" width="650" height="366"></iframe> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/0de33d91a0cd00c82d44d98e470596175d7a2b79/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_013.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/0220408625c974c9a15e2c8e202b4a211fe3ffa3/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_014.jpg"> <iframe src="https://www.youtube.com/embed/A8Ey8XH446k" frameborder="0" width="650" height="366"></iframe> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/9a20574a4909fee7cf6fae76cda1ecfe89982959/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_015.jpg"> <iframe src="https://www.youtube.com/embed/3zShWjwoHSk" frameborder="0" width="650" height="366"></iframe> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/0660c6b1e6ebae29cb797d5609f3d854787a07fe/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_016.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/2a08ff9b380649d91d5903af08e5ebb8c2801041/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_017.jpg"> <iframe src="https://www.youtube.com/embed/d6bF4IKlKLM" frameborder="0" width="650" height="366"></iframe> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/67e5a28069c9c958a25ed6166a5b1be1c1a44ade/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_018.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/547ffe47d6df14237701de738bb2309f9d291ae4/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_019.jpg"> <img src="https://exit.ohou.se/0fcd31ab4dd1e8f261aab6ee844f38725a3f8ef1/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_020.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/bde31b694510eb86747c8eea1e0e316f1e57fecf/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_021.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/0b3f6532acd4d7e6578ec168528b7af2219af8c3/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_022.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/fd1c3a8f7f5d10eb30c3496cc32b66a8b23eb6da/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_023.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/59baabf5c8b209b4230256260346f06a8f93c55c/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_024.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/4a2061f571b4e2057c20dd5a571ef1b5fbd535a5/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_025.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/1852509ea42dd7a54819f42d163154154f0b27cc/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_026.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/c76ad6cd920b83dd2a944bdeb3499114103d3ae5/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_027.jpg"> <img src="https://exit.ohou.se/80f8ff003bb72cca44afe3c086f968439a15aa24/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_028.jpg"> <img src="https://exit.ohou.se/8add11aad4b7b4c59547ddd4b81b589636838eb4/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_029-1.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/ef450225aafb9bd56486c16ec0dd2b017953a0ca/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_030.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/c3608ad4e3664fee849d3859b63c631a743d9e7b/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_031.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/db24e84ab15871995e1338fdcd33bf1bbdf20f43/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_032.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/7bb8f230578edcd32a4da4e22596b8fa335f4060/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_033.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/dddce261fac62b690dae3c2f07792239412a0ff0/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_034.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/f9e12a74c0b76d5de726841f8c09ab4f06eafc7b/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_035.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/005f7b93a0c4024fcca925b2987cf38ef0fbc37a/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_catpole_HW_036.jpg"> <img src="https://exit.ohou.se/1a06a56f61f3b99684c1229329fc0210c568ff68/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_100.jpg"> <img src="https://exit.ohou.se/830749c6c404efd2f95f4d407b924e8a98b68663/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_shortcattower_023.jpg"> <img src="https://exit.ohou.se/6425a5e92aea7c1caae4da1d0e3f049db35a880d/gi.esmplus.com/chfood88/catpole/jajak/opnemaket/860_ja_catpole_022.gif"> <img src="https://exit.ohou.se/c975e869c0845d1474af3d327f7f59725bdc9e4d/gi.esmplus.com/chfood88/test/860_100.jpg">
<div><img src="https://exit.ohou.se/f881b339ae0730e337191fd82096de19f7b9d614/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_ringcattower_HW_034.jpg"></div>
<div><img src="https://exit.ohou.se/eabb9f61c7ecfe31853df0eea449ae81f5a08097/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_ringcattower_HW_035.jpg"></div>
<div><img src="https://exit.ohou.se/e2cc58bfa69e6aa724fc54ff450850ab73946b6a/gi.esmplus.com/chfood88/catpole/akasia/opnemaket/860_aka_ringcattower_HW_036.jpg"></div>
</div>
`;

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