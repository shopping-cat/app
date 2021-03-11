import React, { useCallback, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import IMP, { CallbackRsp } from 'iamport-react-native';
import ScreenLayout from '../../components/Layouts/ScreenLayout';
import DefaultHeader from '../../components/Headers/DefaultHeader';
import { IAMPORT_CODE } from '../../../env';
import { Route, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { OrderCalculateCouponVar } from '../../graphql/order';
import { useCreatePayment } from '../../graphql/payment';
import ActivityIndicatorView from '../../components/ActivityIndicatorView';

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
    deliveryMemo: string
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
            method: params.method,
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
            <DefaultHeader disableBtns disableGoBack title='결제' />
            {(loading || !data) && <ActivityIndicatorView />}
            {(!loading && data) && <IMP.Payment
                userCode={IAMPORT_CODE}
                loading={<ActivityIndicatorView />}
                callback={onCallback}
                data={{
                    pg: 'danal_tpay',
                    app_scheme: 'shoppingcat',
                    pay_method: data.createPayment.paymentMethod === '카드결제' ? 'card' : data.createPayment.paymentMethod === '가상계좌' ? 'vbank' : 'phone',
                    merchant_uid: data.createPayment.id,
                    name: data.createPayment.name,
                    amount: data.createPayment.totalPrice,
                    buyer_tel: data.createPayment.user.certificatedInfo.phone, // TODO
                    buyer_name: data.createPayment.user.certificatedInfo.name,
                    buyer_email: data.createPayment.user.userDetail.email || undefined,
                    buyer_postcode: data.createPayment.postCode,
                    buyer_addr: data.createPayment.address,
                    biz_num: data.createPayment.paymentMethod === '가상계좌' ? params.bank || undefined : undefined,
                    digital: data.createPayment.paymentMethod === '휴대폰결제' ? true : undefined
                }}
            />}
        </ScreenLayout>
    )
}

export default PGScreen

const styles = StyleSheet.create({
})
