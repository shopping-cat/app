import React, { useCallback } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import IMP, { CallbackRsp } from 'iamport-react-native';
import ScreenLayout from '../../components/Layouts/ScreenLayout';
import DefaultHeader from '../../components/Headers/DefaultHeader';
import { IAMPORT_CODE } from '../../../env';
import { Route, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { PaymentResultScreenProps } from '../PaymentResultScreen'
import { OrderCalculateCouponVar } from '../../graphql/order';

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

    const { params } = useRoute<Route<'PG', PGScreenProps>>()
    const { dispatch } = useNavigation()

    const onCallback = useCallback(async (rsp: CallbackRsp) => {
        if (rsp.success) {

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
            <IMP.Payment
                userCode={IAMPORT_CODE}
                loading={<View style={styles.loadingContainer} ><ActivityIndicator /></View>}
                data={{
                    pg: 'danal_tpay',
                    pay_method: 'card',
                    amount: params.amount,
                    name: 'test',
                    app_scheme: 'shoppingcat',
                    buyer_tel: '01024920492',
                    merchant_uid: `test_${new Date().getTime()}`,
                }}
                callback={onCallback}
            />
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
