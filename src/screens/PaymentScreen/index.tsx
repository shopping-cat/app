import React, { useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import moneyFormat from '../../lib/moneyFormat'
import PaymentAddressInfo from './PaymentAddressInfo'
import PaymentItemInfo from './PaymentItemInfo'
import PaymentPrice from './PaymentPrice'
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
                <PaymentAddressInfo />
                <PaymentRefundAccount />
                <PaymentPrice />
            </ScrollView>
            <ButtonFooter
                active
                onPress={onPayment}
                text={`${moneyFormat(156900)}원 결제하기`}
            />
        </ScreenLayout>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({})
