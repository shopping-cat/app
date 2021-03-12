import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import PaymentResultAddress from './PaymentResultAddress'
import PaymentResultDepositWithoutBankbook from './PaymentResultDepositWithoutBankbook'
import PaymentResultError from './PaymentResultError'
import PaymentResultItems from './PaymentResultItems'
import PaymentResultPayment from './PaymentResultPayment'
import PaymentResultSuccess from './PaymentResultSuccess'
import PaymentResultDeliveryMemo from './PaymentResultDeliveryMemo'
import { CallbackRsp } from 'iamport-react-native'
import { useCompletePayment } from '../../graphql/payment'
import LoadingView from '../../components/View/LoadingView'
// TODO 제시도

const PaymentResultScreen = () => {

    const { params } = useRoute<Route<'PaymentResult', CallbackRsp>>()
    const { navigate } = useNavigation()
    const [completePayment, { loading, data }] = useCompletePayment({
        fetchPolicy: 'no-cache',
        variables: {
            imp_uid: params.imp_uid || '',
            merchant_uid: params.merchant_uid || ''
        }
    })

    useEffect(() => {
        completePayment()
    }, [])


    const onPress = useCallback(() => {
        navigate('Home')
    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='주문/결제' disableBtns />
            {!data && <LoadingView />}
            {data && <>
                <ScrollView>
                    {data.completePayment.state === '결제취소' && <PaymentResultError message={data.completePayment.cancelReason} />}
                    {(data.completePayment.state === '구매접수' || data.completePayment.state === '입금대기') && <>
                        <PaymentResultSuccess {...data.completePayment} />
                        {data.completePayment.state === '입금대기' && <PaymentResultDepositWithoutBankbook {...data.completePayment} />}
                        <PaymentResultAddress {...data.completePayment} />
                        <PaymentResultDeliveryMemo {...data.completePayment} />
                        <PaymentResultPayment {...data.completePayment} />
                        <PaymentResultItems {...data.completePayment} />
                    </>}
                </ScrollView>
                <ButtonFooter
                    active
                    text='계속 쇼핑하기'
                    onPress={onPress}
                />
            </>}
        </ScreenLayout>
    )
}

export default PaymentResultScreen

const styles = StyleSheet.create({


})
