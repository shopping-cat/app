import React, { useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useNavigation, useRoute, Route } from '@react-navigation/native'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { PaymentState } from '../../constants/types'
import OrderDetailAddress from './OrderDetailAddress'
import OrderDetailCancelGuide from './OrderDetailCancelGuide'
import OrderDetailCancelInfo from './OrderDetailCancelInfo'
import OrderDetailDepositWithoutBankbook from './OrderDetailDepositWithoutBankbook'
import OrderDetailItemInfo from './OrderDetailItemInfo'
import OrderDetailDeliveryMemo from './OrderDetailDeliveryMemo'
import OrderDetailPaymentInfo from './OrderDetailPaymentInfo'
import { usePayment } from '../../graphql/payment'
import ActivityIndicatorView from '../../components/ActivityIndicatorView'

let billingWay = '무통장입금'

export interface OrderDetailScreenProps {
    id: string
}

const OrderDetailScreen = () => {

    const { params } = useRoute<Route<'OrderDetail', OrderDetailScreenProps>>()
    const { navigate } = useNavigation()
    const { data, loading } = usePayment({
        fetchPolicy: 'network-only',
        variables: { id: params.id }
    })

    const onButtonFooter = useCallback(() => {
        if (!data) return
        const state = data.payment.state
        if (state === '취소처리') return // 작동 안함
        if (state === '오류처리') return // 작동 안함
        if (state === '정상처리') navigate('OrderCancelGuide')
        if (state === '구매접수') { // 주문 취소

        }
    }, [data])

    const footerText = !data ? '' : (data.payment.state === '구매접수' || data.payment.state === '입금대기') ? '주문 취소' : data.payment.state === '정상처리' ? '교환/반품 안내' : data.payment.state === '취소처리' ? '주문 취소 완료' : '오류 처리 완료'

    return (
        <ScreenLayout >
            <DefaultHeader title='주문상세' disableBtns />
            {loading && <ActivityIndicatorView />}
            {data && <>
                <ScrollView
                    overScrollMode='never'
                >
                    <OrderDetailItemInfo {...data.payment} />
                    <OrderDetailCancelGuide />
                    {data.payment.state === '입금대기' && <OrderDetailDepositWithoutBankbook {...data.payment} />}
                    {data.payment.state === '취소처리' && <OrderDetailCancelInfo {...data.payment} />}
                    <OrderDetailAddress {...data.payment} />
                    <OrderDetailDeliveryMemo {...data.payment} />
                    <OrderDetailPaymentInfo {...data.payment} />
                </ScrollView>
                <ButtonFooter
                    active={data.payment.state === '구매접수' || data.payment.state === '정상처리'}
                    onPress={onButtonFooter}
                    text={footerText}
                />
            </>}

        </ScreenLayout>
    )
}

export default OrderDetailScreen

const styles = StyleSheet.create({})
