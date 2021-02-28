import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import PaymentResultAddress from './PaymentResultAddress'
import PaymentResultDepositWithoutBankbook from './PaymentResultDepositWithoutBankbook'
import PaymentResultError from './PaymentResultError'
import PaymentResultItems from './PaymentResultItems'
import PaymentResultPayment from './PaymentResultPayment'
import PaymentResultSuccess from './PaymentResultSuccess'
import PaymentResultDeliveryMemo from './PaymentResultDeliveryMemo'

const isDepositWithoutBankbook = true

export interface PaymentResultScreenProps {
    errorMessage?: string

}

const PaymentResultScreen = () => {

    const { params } = useRoute<Route<'PaymentResult', PaymentResultScreenProps>>()
    const { navigate } = useNavigation()


    const onPress = useCallback(() => {
        navigate('Home')
    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='주문/결제' disableBtns />
            <ScrollView>
                {!!params.errorMessage && <PaymentResultError message={params.errorMessage} />}
                {!params.errorMessage && <>
                    <PaymentResultSuccess />
                    {isDepositWithoutBankbook && <PaymentResultDepositWithoutBankbook />}
                    <PaymentResultAddress />
                    <PaymentResultDeliveryMemo />
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
