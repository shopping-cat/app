import React, { useCallback, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import IMP, { CallbackRsp } from 'iamport-react-native';
import ScreenLayout from '../../components/Layouts/ScreenLayout';
import DefaultHeader from '../../components/Headers/DefaultHeader';
import { IAMPORT_CODE } from '../../../env';
import { Route, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { PaymentResultScreenProps } from '../PaymentResultScreen'
import { OrderCalculateCouponVar } from '../../graphql/order';
import { COLOR1, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles';
import { useCreatePayment } from '../../graphql/payment';

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

    const [createPayment, { data, loading }] = useCreatePayment({
        fetchPolicy: 'no-cache',
        variables: {
            amount: params.amount,
            cartItemIds: params.cartItemIds,
            coupons: params.coupons,
            point: params.point,
            method: params.method
        },
        onError: () => { goBack() }
    })

    useEffect(() => {
        createPayment()
    }, [])


    const onCallback = useCallback(async (rsp: CallbackRsp) => {
        if (rsp.success) {
            console.log(rsp)
            rsp.imp_uid
            rsp.merchant_uid
            const screenParams: PaymentResultScreenProps = {

            }
            dispatch(StackActions.replace('PaymentResult', screenParams))
        } else {
            console.error(rsp.error_msg)
            const screenParams: PaymentResultScreenProps = {
                errorMessage: rsp.error_msg
            }
            dispatch(StackActions.replace('PaymentResult', screenParams))
        }
    }, [params])


    return (
        <ScreenLayout>
            <DefaultHeader disableBtns disableGoBack title='결제' />
            {(loading || !data) && <View style={styles.loadingContainer} ><ActivityIndicator color={VERY_LIGHT_GRAY} /></View>}
            {(!loading && data) && <IMP.Payment
                userCode={IAMPORT_CODE}
                loading={<View style={styles.loadingContainer} ><ActivityIndicator color={VERY_LIGHT_GRAY} /></View>}
                data={{
                    pg: 'danal_tpay',
                    app_scheme: 'shoppingcat',
                    pay_method: data.createPayment.paymentMethod === '카드결제' ? 'card' : data.createPayment.paymentMethod === '무통장입금' ? 'vbank' : 'phone',
                    merchant_uid: data.createPayment.id,
                    name: data.createPayment.name,
                    amount: data.createPayment.totalPrice,
                    buyer_tel: '01024920492',
                    buyer_name: data.createPayment.user.name,
                    buyer_email: data.createPayment.user.userDetail.email || undefined,
                    buyer_postcode: data.createPayment.postCode,
                    buyer_addr: data.createPayment.address,
                    biz_num: data.createPayment.paymentMethod === '무통장입금' ? params.bank || undefined : undefined,
                    digital: data.createPayment.paymentMethod === '휴대폰결제' ? true : undefined
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
