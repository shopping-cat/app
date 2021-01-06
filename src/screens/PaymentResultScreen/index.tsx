import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import PaymentResultAddress from './PaymentResultAddress'
import PaymentResultDepositWithoutBankbook from './PaymentResultDepositWithoutBankbook'
import PaymentResultError from './PaymentResultError'
import PaymentResultItems from './PaymentResultItems'
import PaymentResultPayment from './PaymentResultPayment'
import PaymentResultSuccess from './PaymentResultSuccess'

const isSuccess = true
const isDepositWithoutBankbook = true

const PaymentResultScreen = () => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        navigate('Home')
    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='주문/결제' disableBtns />
            <ScrollView>
                {!isSuccess && <PaymentResultError />}
                {isSuccess && <>
                    <PaymentResultSuccess />
                    {isDepositWithoutBankbook && <PaymentResultDepositWithoutBankbook />}
                    <PaymentResultAddress />
                    <PaymentResultPayment />
                    <PaymentResultItems />
                </>}
            </ScrollView>
            <ButtonFooter
                active
                text='계속 쇼핑하기'
                onPress={onPress}
            />
        </ScreenLayout>
    )
}

export default PaymentResultScreen

const styles = StyleSheet.create({


})
