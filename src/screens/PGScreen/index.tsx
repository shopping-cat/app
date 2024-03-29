import React, { useCallback, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import IMP, { CallbackRsp } from 'iamport-react-native';
import ScreenLayout from '../../components/Layouts/ScreenLayout';
import DefaultHeader from '../../components/Headers/DefaultHeader';
import { Route, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { OrderCalculateCouponVar } from '../../graphql/order';
import { useCreatePayment } from '../../graphql/payment';
import LoadingView from '../../components/View/LoadingView';
import { BIZ_NUM, EASY_PAYMENT_METHOD, IAMPORT_CODE, PAY_METHOD } from '../../constants/values';
import paymentMethodGenerator from '../../lib/paymentMethodGenerator';

export interface PGScreenProps {
    cartItemIds: number[]
    method: PAY_METHOD
    bank: string | null
    coupons: OrderCalculateCouponVar[]
    point: number
    cashReceiptName: string
    cashReceiptType: string
    cashReceiptNumber: string
    amount: number
    deliveryMemo: string
    easyPaymentMethod: EASY_PAYMENT_METHOD | null
}

const PGScreen = () => {

    const { goBack, reset } = useNavigation()
    const { params } = useRoute<Route<'PG', PGScreenProps>>()

    const [createPayment, { data, loading }] = useCreatePayment({
        fetchPolicy: 'no-cache',
        variables: {
            amount: params.amount,
            cartItemIds: params.cartItemIds,
            coupons: params.coupons,
            point: params.point,
            method: params.method === '간편결제' ? (params.easyPaymentMethod || params.method) : params.method,
            deliveryMemo: params.deliveryMemo
        },
        onError: () => { goBack() }
    })

    useEffect(() => {
        createPayment()
    }, [])


    const onCallback = useCallback(async (rsp: CallbackRsp) => {
        reset({
            index: 1,
            routes: [
                { name: 'Tab' },
                { name: 'PaymentResult', params: rsp }
            ]
        })
    }, [params])


    return (
        <ScreenLayout>
            <DefaultHeader disableBtns title='결제' />
            {(loading || !data) && <LoadingView />}
            {(!loading && data) && <IMP.Payment
                userCode={IAMPORT_CODE}
                loading={<LoadingView />}
                callback={onCallback}
                data={{
                    pg: 'html5_inicis',
                    app_scheme: 'shoppingcat',
                    pay_method: paymentMethodGenerator(data.createPayment.paymentMethod),
                    merchant_uid: data.createPayment.id,
                    name: data.createPayment.name,
                    amount: data.createPayment.totalPrice,
                    buyer_tel: data.createPayment.user.certificatedInfo.phone,
                    buyer_email: data.createPayment.user.userDetail.email || undefined,
                    buyer_postcode: data.createPayment.postCode,
                    buyer_addr: data.createPayment.address,
                    digital: false
                }}
            />}
        </ScreenLayout>
    )
}

export default PGScreen

const styles = StyleSheet.create({
})
