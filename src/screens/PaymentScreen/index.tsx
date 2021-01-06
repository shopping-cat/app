import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import { IS_IOS } from '../../constants/values'
import moneyFormat from '../../lib/moneyFormat'
import PaymentAddressInfo from './PaymentAddressInfo'
import PaymentItemInfo from './PaymentItemInfo'
import PaymentMethod from './PaymentMethod'
import PaymentPrice from './PaymentPrice'
import PaymentRefundAccount from './PaymentRefundAccount'
import PaymnetDepositWithoutBankbook from './PaymnetDepositWithoutBankbook'

const PAY_METHODS = ['카드결제', '무통장입금', '휴대폰결제']
const BANKS = ['우체국 (123124-2-4124-12)', '농협 (12353-512525-512)', '우리 (15025-125251-25125)', '우채국 (25125-2512-12-2)', '우체국 (123124-2-4124-12)', '농협 (12353-512525-512)', '우리 (15025-125251-25125)', '우채국 (25125-2512-12-2)']

const PaymentScreen = () => {

    const { navigate, dispatch } = useNavigation()

    const scrollViewRef = useRef<ScrollView>(null)

    const [method, setMethod] = useState(PAY_METHODS[0])
    const [methodSheetVisible, setMethodSheetVisible] = useState(false)

    const [bank, setBank] = useState(BANKS[0]) //무통장입금 은행
    const [bankSheetVisible, setBankSheetVisible] = useState(false)

    const onPayment = useCallback(() => {
        // navigate('PaymentResult')
        dispatch(StackActions.replace('PaymentResult'))
    }, [])

    const onMethod = useCallback(() => {
        setMethodSheetVisible(true)
    }, [])

    const onChangeMethod = useCallback((i: number) => {
        setMethod(PAY_METHODS[i])
        console.log(i)
        if (i === 1) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true })
            }, 100)
        }
    }, [scrollViewRef])

    const onBank = useCallback(() => {
        setBankSheetVisible(true)
    }, [])

    const onChangeBank = useCallback((i: number) => {
        setBank(BANKS[i])
    }, [])

    return (
        <ScreenLayout disableStatusbarHeight >
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior='padding'
                enabled={IS_IOS}
            >
                <StatusBarHeightView />
                <DefaultHeader title='주문/결제' disableBtns />
                <ScrollView
                    ref={scrollViewRef}
                    overScrollMode='never'
                    showsVerticalScrollIndicator
                >
                    <PaymentItemInfo />
                    <PaymentAddressInfo />
                    <PaymentRefundAccount />
                    <PaymentPrice />
                    <PaymentMethod onMethod={onMethod} method={method} />
                    {method === '무통장입금' && <PaymnetDepositWithoutBankbook bank={bank} onBank={onBank} />}
                </ScrollView>
            </KeyboardAvoidingView>
            <ButtonFooter
                active
                onPress={onPayment}
                text={`${moneyFormat(156900)}원 결제하기`}
            />
            <SelectBottomSheet
                list={PAY_METHODS}
                visible={methodSheetVisible}
                onClose={() => setMethodSheetVisible(false)}
                onSelect={onChangeMethod}
            />
            <SelectBottomSheet
                list={BANKS}
                visible={bankSheetVisible}
                onClose={() => setBankSheetVisible(false)}
                onSelect={onChangeBank}
            />
        </ScreenLayout>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1
    }
})
