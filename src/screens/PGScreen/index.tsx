import React, { useCallback } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import IMP, { CallbackRsp } from 'iamport-react-native';
import ScreenLayout from '../../components/Layouts/ScreenLayout';
import DefaultHeader from '../../components/Headers/DefaultHeader';
import { IAMPORT_CODE } from '../../../env';
import { Route, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { PaymentResultScreenProps } from '../PaymentResultScreen'
import { OrderCalculateCouponVar, useOrderDataToPGData } from '../../graphql/order';

export interface PGScreenProps {
    cartItemIds: number[]
    method: string
    bank: string | null
    coupons: OrderCalculateCouponVar[]
    point: number
    cashReceiptName: string
    cashReceiptType: string
    cashReceiptNumber: string
    amount: number
}

const PGScreen = () => {

    const { dispatch, goBack } = useNavigation()
    const { params } = useRoute<Route<'PG', PGScreenProps>>()

    const { data, loading } = useOrderDataToPGData({
        nextFetchPolicy: 'no-cache',
        variables: {
            amount: params.amount,
            cartItemIds: params.cartItemIds,
            coupons: params.coupons,
            point: params.point
        },
        onError: () => { goBack() }
    })


    const onCallback = useCallback(async (rsp: CallbackRsp) => {
        if (rsp.success) {
            console.log(rsp)
            const params: PaymentResultScreenProps = {

            }
            dispatch(StackActions.replace('PaymentResult', params))
        } else {
            console.error(rsp.error_msg)
            const params: PaymentResultScreenProps = {
                errorMessage: rsp.error_msg
            }
            dispatch(StackActions.replace('PaymentResult', params))
        }
    }, [])


    return (
        <ScreenLayout>
            <DefaultHeader disableBtns disableGoBack title='결제' />
            {loading && <View style={styles.loadingContainer} ><ActivityIndicator /></View>}
            {(!loading && data) && <IMP.Payment
                userCode={IAMPORT_CODE}
                loading={<View style={styles.loadingContainer} ><ActivityIndicator /></View>}
                data={{
                    pg: 'danal_tpay',
                    app_scheme: 'shoppingcat',
                    pay_method: params.method === '카드결제' ? 'card' : params.method === '무통장입금' ? 'vbank' : 'phone',
                    merchant_uid: data.orderDataToPGData.uid,
                    name: data.orderDataToPGData.name,
                    amount: data.orderDataToPGData.amount,
                    buyer_tel: '01024920492',
                    buyer_name: data.orderDataToPGData.user.name,
                    buyer_postcode: data.orderDataToPGData.user.deliveryInfo.postCode,
                    buyer_email: data.orderDataToPGData.user.userDetail.email || undefined,
                    buyer_addr: data.orderDataToPGData.user.deliveryInfo.address + ' ' + data.orderDataToPGData.user.deliveryInfo.addressDetail,
                    biz_num: params.method === '무통장입금' ? params.bank || undefined : undefined,
                    digital: params.method === '휴대폰결제' ? true : undefined
                }}
                callback={onCallback}
            />}
        </ScreenLayout>
    )
}

export default PGScreen

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
