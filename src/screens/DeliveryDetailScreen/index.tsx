import { useRoute } from '@react-navigation/core'
import { Route } from '@react-navigation/routers'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import BaseText from '../../components/Text/BaseText'
import LoadingView from '../../components/View/LoadingView'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { useOrder } from '../../graphql/order'
import moneyFormat from '../../lib/moneyFormat'

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
            {data && <ScrollView style={styles.container} >

                <View style={styles.infoContainer} >
                    <BaseText style={styles.title} >상품 정보</BaseText>
                    <View style={styles.itemContainer} >
                        <Image
                            source={{ uri: data.order.item.mainImage }}
                            style={styles.itemImage}
                        />
                        <View>
                            <BaseText numberOfLines={1} >{data.order.item.name}</BaseText>
                            <BaseText style={styles.itemOption} numberOfLines={1} >{data.order.stringOptionNum}</BaseText>
                            <View style={styles.itemPriceContainer} >
                                <BaseText style={styles.itemPrice}  >{moneyFormat(data.order.totalPrice)}원</BaseText>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={styles.infoContainer} >
                    <BaseText style={styles.title} >배송정보</BaseText>
                    <View style={[styles.labelContainer]} >
                        <BaseText style={styles.label} >택배사</BaseText>
                        <BaseText  >{data.order.deliveryCompany}</BaseText>
                    </View>
                    <View style={[styles.labelContainer, { marginBottom: 0 }]} >
                        <BaseText style={styles.label} >송장번호</BaseText>
                        <BaseText selectable >{data.order.deliveryNumber}</BaseText>
                    </View>
                </View>
            </ScrollView>}
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