import { Route, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native'
import LoadingView from '../../components/View/LoadingView'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/View/StatusBarHeightView'
import { V_REFUND_BANKS, CASH_RECEIPT_TYPES, IS_IOS, PAY_METHODS, DELIVERY_MEMOS, PAY_METHOD, EASY_PAYMENT_METHOD } from '../../constants/values'
import { useOrderCalculate } from '../../graphql/order'
import useCouponPoint from '../../hooks/useCouponPoint'
import useInput from '../../hooks/useInput'
import moneyFormat from '../../lib/moneyFormat'
import { PGScreenProps } from '../PGScreen'
import PaymentAddressInfo from './PaymentAddressInfo'
import PaymentCertification from './PaymentCerification'
import PaymentDeliveryMemo from './PaymentDeliveryMemo'
import PaymentItemInfo from './PaymentItemInfo'
import PaymentMethod from './PaymentMethod'
import PaymentPrice from './PaymentPrice'
import PaymentRefundAccount from './PaymentRefundAccount'
import PaymnetDepositWithoutBankbook from './PaymnetDepositWithoutBankbook'
import useToast from '../../hooks/useToast'
import PaymentEasyPayment from './PaymentEasyPayment'



export interface PaymentScreenProps {
    cartItemIds: number[]
}

const PaymentScreen = () => {

    const { params } = useRoute<Route<'Payment', PaymentScreenProps>>()
    const { navigate } = useNavigation()

    const scrollViewRef = useRef<ScrollView>(null)
    const { show } = useToast()

    const [method, setMethod] = useState<PAY_METHOD>(PAY_METHODS[0])
    const [methodSheetVisible, setMethodSheetVisible] = useState(false)
    // 가상계좌
    const [bankSheetVisible, setBankSheetVisible] = useState(false)
    const [bank, setBank] = useState<string | null>(null) // 가상계좌
    const [cashReceiptName, onChangeCashReceiptName] = useInput('')
    const [cashReceiptType, setCashReceiptType] = useState(CASH_RECEIPT_TYPES[0])
    const [cashReceiptNumber, onChangeCashReceiptNumber] = useInput('', true)
    // 간편결제
    const [easyPaymentMethod, setEasyPaymentMethod] = useState<null | EASY_PAYMENT_METHOD>(null)
    // 배송매모
    const [deliveryMemo, setDeliveryMemo] = useState(DELIVERY_MEMOS[0])
    const [deliveryMemoVisible, setDeliveryMemoVisible] = useState(false)

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

    const active = data?.orderCalculate.user.certificatedInfo && data?.orderCalculate.user.deliveryInfo && (method === '가상계좌' ? bank && cashReceiptName && (cashReceiptType !== '미신청' ? cashReceiptNumber : true) : true) && (method === '간편결제' ? !!easyPaymentMethod : true)

    useEffect(() => {
        init()
    }, [])

    useEffect(() => { // 포인트를 먼저 선택하고 쿠폰을 고르면 최소 결제 금액 보다 아래로 갈수 있기 때문에 처리
        if (!data) return
        if (data.orderCalculate.maxPointPrice < point) setPoint(data.orderCalculate.maxPointPrice)
    }, [data?.orderCalculate.maxPointPrice])

    const onPayment = useCallback(() => {
        if (loading || !data) return
        if (!active) {
            if (!data.orderCalculate.user.certificatedInfo) show('본인인증을 해주세요')
            if (!data.orderCalculate.user.deliveryInfo) show('배송지를 입력해주세요')
            // else if (!data.orderCalculate.user.refundBankAccount) show('환불계좌를 입력해주세요')
            else if (method === '간편결제' && !easyPaymentMethod) show('간편결제를 골라주세요')
            return
        }

        const pgParams: PGScreenProps = {
            method,
            coupons,
            point,
            cartItemIds: params.cartItemIds,
            bank,
            cashReceiptName,
            cashReceiptType,
            cashReceiptNumber,
            amount: data.orderCalculate.totalPaymentPrice,
            deliveryMemo,
            easyPaymentMethod
        }
        navigate('PG', pgParams)
    }, [loading, method, bank, coupons, point, params, active, cashReceiptName, cashReceiptType, cashReceiptNumber, data, deliveryMemo, easyPaymentMethod])

    const onMethod = useCallback(() => {
        setMethodSheetVisible(true)
    }, [])

    const onChangeMethod = useCallback((i: number) => {
        const currentMethod = PAY_METHODS[i]
        setMethod(currentMethod)
        if (currentMethod === '가상계좌' || currentMethod === '간편결제') {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true })
            }, 100)
        }
    }, [scrollViewRef])

    const onBank = useCallback(() => {
        setBankSheetVisible(true)
    }, [])

    const onChangeBank = useCallback((i: number) => {
        setBank(V_REFUND_BANKS[i])
    }, [])

    const onChangeDeliveryMemo = useCallback((i: number) => {
        setDeliveryMemo(i === 1 ? '' : DELIVERY_MEMOS[i])
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
                {!data && <LoadingView />}
                {data && <ScrollView
                    ref={scrollViewRef}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                >
                    <PaymentItemInfo data={data.orderCalculate} />
                    <PaymentCertification data={data.orderCalculate} />
                    <PaymentAddressInfo data={data.orderCalculate} />
                    {/* <PaymentRefundAccount data={data.orderCalculate} /> */}
                    <PaymentDeliveryMemo
                        memo={deliveryMemo}
                        setMemo={t => setDeliveryMemo(t)}
                        onPress={() => setDeliveryMemoVisible(true)}
                    />
                    <PaymentPrice data={data.orderCalculate} />
                    <PaymentMethod onMethod={onMethod} method={method} />
                    {method === '가상계좌' && <PaymnetDepositWithoutBankbook
                        bank={bank}
                        onBank={onBank}
                        cashReceiptName={cashReceiptName}
                        cashReceiptNumber={cashReceiptNumber}
                        cashReceiptType={cashReceiptType}
                        onChangeCashReceiptName={onChangeCashReceiptName}
                        onChangeReceiptNumber={onChangeCashReceiptNumber}
                        setCashReceiptType={setCashReceiptType}
                    />}
                    {method === '간편결제' && <PaymentEasyPayment
                        easyPaymentMethod={easyPaymentMethod}
                        setEasyPaymentMethod={setEasyPaymentMethod}
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
                list={V_REFUND_BANKS}
                visible={bankSheetVisible}
                onClose={() => setBankSheetVisible(false)}
                onSelect={onChangeBank}
            />
            <SelectBottomSheet
                list={DELIVERY_MEMOS}
                visible={deliveryMemoVisible}
                onClose={() => setDeliveryMemoVisible(false)}
                onSelect={onChangeDeliveryMemo}
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
