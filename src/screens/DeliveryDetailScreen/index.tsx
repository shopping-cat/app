import { useRoute } from '@react-navigation/core'
import { Route } from '@react-navigation/routers'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import WebView from 'react-native-webview'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import LoadingView from '../../components/View/LoadingView'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { SWEETTRACKER_API_KEY } from '../../constants/values'
import { useOrder } from '../../graphql/order'


interface DeliveryDetailProps {
    id: number
}

const DeliveryDetail = () => {

    const { params } = useRoute<Route<'DelvieryDetail', DeliveryDetailProps>>()
    const { data } = useOrder({ variables: { id: params.id } })


    return (
        <ScreenLayout>
            <DefaultHeader title='배송조회' disableBtns />
            {!data && <LoadingView />}
            {data && <WebView
                source={{
                    html: `
                    <form action="http://info.sweettracker.co.kr/tracking/0" method="post">
                        <input type="text" class="form-control" id="t_key" name="t_key" value="${SWEETTRACKER_API_KEY}">
                        <input type="text" class="form-control" name="t_code" id="t_code" value="${data.order.deliveryCompanyCode}">
                        <input type="text" class="form-control" name="t_invoice" id="t_invoice" value="${data.order.deliveryNumber}">
                    </form>
                    <script>
                        document.querySelector("form").submit()
                    </script>
                    `
                }}
            />}
        </ScreenLayout>
    )
}

export default DeliveryDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    infoContainer: {
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    title: {
        fontSize: 18,
        marginBottom: 24
    },
    content: {
        flex: 1,
        paddingLeft: 8,
        color: GRAY,
        lineHeight: 20,
    },
    itemContainer: {
        width: '100%',
        paddingHorizontal: 8,
        flexDirection: 'row'
    },
    itemImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    itemOption: {
        color: GRAY,
        marginTop: 8,
        marginBottom: 8
    },
    itemPriceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    itemPrice: {
        fontSize: 16
    },
    itemNumber: {
        color: GRAY,
        marginLeft: 8
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8,
        marginBottom: 24
    },
    label: {
        color: GRAY,
    }
})