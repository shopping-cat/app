import React, { useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
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

let state: PaymentState = '구매접수'
let billingWay = '무통장입금'

const OrderDetailScreen = () => {

    const { navigate } = useNavigation()

    const onButtonFooter = useCallback(() => {
        if (state === '취소처리') return // 작동 안함
        if (state === '오류처리') return // 작동 안함
        if (state === '정상처리') navigate('OrderCancelGuide')
        if (state === '구매접수') navigate('OrderCancel') // 주문 취소
    }, [state])

    return (
        <ScreenLayout >
            <DefaultHeader title='주문상세' disableBtns />
            <ScrollView
                overScrollMode='never'
            >
                <OrderDetailItemInfo />
                <OrderDetailCancelGuide />
                {billingWay === '무통장입금' && state === '구매접수' && <OrderDetailDepositWithoutBankbook />}
                {state === '취소처리' && <OrderDetailCancelInfo />}
                <OrderDetailAddress />
                <OrderDetailDeliveryMemo />
                <OrderDetailPaymentInfo />
            </ScrollView>
            <ButtonFooter
                active={state === '구매접수' || state === '정상처리'}
                onPress={onButtonFooter}
                text={state === '구매접수' ? '주문 취소' : state === '정상처리' ? '교환/반품 안내' : state === '취소처리' ? '주문 취소 완료' : '오류 처리 완료'}
            />
        </ScreenLayout>
    )
}

export default OrderDetailScreen

const styles = StyleSheet.create({})
