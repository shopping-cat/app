import React, { useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import PaymentFooter from './PaymentFooter'
import PaymentItemInfo from './PaymentItemInfo'

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
