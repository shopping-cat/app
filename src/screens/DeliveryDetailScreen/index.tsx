import { useRoute } from '@react-navigation/core'
import { Route } from '@react-navigation/routers'
import React from 'react'
import WebView from 'react-native-webview'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import LoadingView from '../../components/View/LoadingView'
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
                source={{ uri: `https://tracker.delivery/#/${data.order.deliveryCompanyCode}/${data.order.deliveryNumber}` }}
            />}
        </ScreenLayout>
    )
}

export default DeliveryDetail