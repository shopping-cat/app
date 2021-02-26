import { Route, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import { BANKS, CASH_RECEIPT_TYPE, CASH_RECEIPT_TYPES, IS_IOS, PAY_METHODS } from '../../constants/values'
import { useOrderCalculate } from '../../graphql/order'
import useCouponPoint from '../../hooks/useCouponPoint'
import useInput from '../../hooks/useInput'
import moneyFormat from '../../lib/moneyFormat'
import { PGScreenProps } from '../PGScreen'
import PaymentAddressInfo from './PaymentAddressInfo'
import PaymentItemInfo from './PaymentItemInfo'
import PaymentMethod from './PaymentMethod'
import PaymentPrice from './PaymentPrice'
import PaymentRefundAccount from './PaymentRefundAccount'
import PaymentSkeleton from './PaymentSkeleton'
import PaymnetDepositWithoutBankbook from './PaymnetDepositWithoutBankbook'



export interface PaymentScreenProps {
    cartItemIds: number[]
}

const PaymentScreen = () => {

    const { params } = useRoute<Route<'Payment', PaymentScreenProps>>()
    const { navigate } = useNavigation()

    const scrollViewRef = useRef<ScrollView>(null)

    const [method, setMethod] = useState(PAY_METHODS[0])
    const [methodSheetVisible, setMethodSheetVisible] = useState(false)
    // 무통장 입금
    const [bankSheetVisible, setBankSheetVisible] = useState(false)
    const [bank, setBank] = useState<string | null>(null) //무통장입금
    const [cashReceiptName, onChangeCashReceiptName] = useInput('')
    const [cashReceiptType, setCashReceiptType] = useState(CASH_RECEIPT_TYPES[0])
    const [cashReceiptNumber, onChangeCashReceiptNumber] = useInput('', true)

    const { coupons, point, init, setPoint } = useCouponPoint()

    const { data, loading } = useOrderCalculate({
        variables: {
            cartItemIds: params.cartItemIds,
            coupons,
            point
        },
        fetchPolicy: 'network-only',
        nextFetchPolicy: 'cache-and-network'
    })

    const active = data?.orderCalculate.user.deliveryInfo && data.orderCalculate.user.refundBankAccount && (method === '무통장입금' ? bank && cashReceiptName && (cashReceiptType !== '미신청' ? cashReceiptNumber : true) : true)

    useEffect(() => {
        init()
    }, [])

    useEffect(() => { // 포인트를 먼저 선택하고 쿠폰을 고르면 최소 결제 금액 보다 아래로 갈수 있기 때문에 처리
        if (!data) return
        if (data.orderCalculate.maxPointPrice < point) setPoint(data.orderCalculate.maxPointPrice)
    }, [data?.orderCalculate.maxPointPrice])

    const onPayment = useCallback(() => {
        if (loading || !active || !data) return
        const pgParams: PGScreenProps = {
            method,
            coupons,
            point,
            cartItemIds: params.cartItemIds,
            bank,
            cashReceiptName,
            cashReceiptType,
            cashReceiptNumber,
            amount: data.orderCalculate.totalPaymentPrice
        }
        navigate('PG', pgParams)
    }, [loading, method, bank, coupons, point, params, active, cashReceiptName, cashReceiptType, cashReceiptNumber, data])

    const onMethod = useCallback(() => {
        setMethodSheetVisible(true)
    }, [])

    const onChangeMethod = useCallback((i: number) => {
        setMethod(PAY_METHODS[i])
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
                {!data && <PaymentSkeleton />}
                {data && <ScrollView
                    ref={scrollViewRef}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                    <PaymentItemInfo data={data.orderCalculate} />
                    <PaymentAddressInfo data={data.orderCalculate} />
                    <PaymentRefundAccount data={data.orderCalculate} />
                    <PaymentPrice data={data.orderCalculate} />
                    <PaymentMethod onMethod={onMethod} method={method} />
                    {method === '무통장입금' && <PaymnetDepositWithoutBankbook
                        bank={bank}
                        onBank={onBank}
                        cashReceiptName={cashReceiptName}
                        cashReceiptNumber={cashReceiptNumber}
                        cashReceiptType={cashReceiptType}
                        onChangeCashReceiptName={onChangeCashReceiptName}
                        onChangeReceiptNumber={onChangeCashReceiptNumber}
                        setCashReceiptType={setCashReceiptType}
                    />}
                </ScrollView>}
            </KeyboardAvoidingView>
            {data && <ButtonFooter
                active={!!active}
                onPress={onPayment}
                text={`${moneyFormat(data.orderCalculate.totalPaymentPrice)}원 결제하기`}
                loading={loading}
            />}
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
