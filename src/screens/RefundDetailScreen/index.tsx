import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'
import { useOrder, useRefundCancelOrder } from '../../graphql/order'
import LoadingView from '../../components/View/LoadingView'
import useConfirm from '../../hooks/useConfirm'
import StatusBarHeightView from '../../components/View/StatusBarHeightView'

interface RefundDetailScreenProps {
    id: number // orderId
}

const RefundDetailScreen = () => {


    const { params } = useRoute<Route<'RefundDetail', RefundDetailScreenProps>>()
    const { data } = useOrder({ variables: { id: params.id } })
    const [refundCancelOrder, { loading }] = useRefundCancelOrder()
    const { goBack } = useNavigation()
    const { show } = useConfirm()


    const onCancel = useCallback(async () => {
        if (!data) return
        show(
            '환불 취소',
            '정말 환불 취소 하시겠습니까?',
            async () => {
                await refundCancelOrder({ variables: { id: data.order.id } })
                goBack()
            }
        )

    }, [data])


    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <DefaultHeader title='환불상세' disableBtns />
            {!data && <LoadingView />}
            {data && <ScrollView
                style={styles.container}
                overScrollMode='never'
            >
                <View style={styles.infoContainer} >
                    <BaseText style={styles.title} >환불/반품 방법</BaseText>
                    <BaseText style={styles.content} >{data.order.item.shop.refundInfo}</BaseText>
                </View>

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
                    <BaseText style={styles.title} >환불 사유</BaseText>
                    <BaseText style={styles.content} >{data.order.reason}</BaseText>
                </View>

                <View style={styles.infoContainer} >
                    <BaseText style={styles.title} >상세 사유</BaseText>
                    <BaseText style={styles.content} >{data.order.reasonDetail || '없음'}</BaseText>
                </View>

                <View style={styles.infoContainer} >
                    <BaseText style={styles.title} >환불 정보</BaseText>
                    <View style={[styles.labelContainer, { marginBottom: 0 }]} >
                        <BaseText style={styles.label} >상품 결제 금액</BaseText>
                        <BaseText  >{moneyFormat(data.order.totalPrice)}원</BaseText>
                    </View>
                </View>

                <View style={[styles.labelContainer, { marginTop: 24 }]} >
                    <BaseText style={styles.label} >예상 환불금액</BaseText>
                    <BaseText style={{ color: COLOR1 }} >{moneyFormat(data.order.expectationRefundPrice)}원</BaseText>
                </View>
                <View style={styles.labelContainer} >
                    <BaseText style={styles.label} >예상 환불 포인트</BaseText>
                    <BaseText  >{moneyFormat(data.order.expectationRefundPoint)}포인트</BaseText>
                </View>
                <View style={styles.labelContainer} >
                    <BaseText style={styles.label} >예상 환불수단</BaseText>
                    <BaseText  >{data.order.expectationRefundMethod}</BaseText>
                </View>

            </ScrollView>}
            <ButtonFooter
                active
                text='환불 요청 취소'
                loading={loading}
                onPress={onCancel}
            />
        </ScreenLayout>
    )
}

export default RefundDetailScreen

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