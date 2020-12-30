import React, { useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import PaymentDeliveryInfo from './PaymentDeliveryInfo'
import PaymentFooter from './PaymentFooter'
import PaymentItemInfo from './PaymentItemInfo'
import PaymentRefundAccount from './PaymentRefundAccount'

const PaymentScreen = () => {

    const onPayment = useCallback(() => {

    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='주문/결제' disableBtns />
            <ScrollView
                showsVerticalScrollIndicator
            >
                <PaymentItemInfo />
                <PaymentDeliveryInfo />
                <PaymentRefundAccount />
            </ScrollView>
            <PaymentFooter
                active={true}
                onPress={onPayment}
                totalPaymentPrice={156900}
            />
        </ScreenLayout>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({})
