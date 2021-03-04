import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import BaseText from '../../components/BaseText'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { IS_IOS, V_REFUND_BANKS } from '../../constants/values'
import { useIUser, useUpdateRefundBankAccount } from '../../graphql/user'
import useInput from '../../hooks/useInput'


const RefundAccountScreen = () => {

    const { goBack } = useNavigation()

    // UI
    const [bankSelectorVisible, setBankSelectorVisible] = useState(false)
    // DATA

    const { data } = useIUser()
    const [updateRefundBankAccount, { loading }] = useUpdateRefundBankAccount()
    const [bankName, setBankName] = useState<null | string>(null)
    const [ownerName, onChangeOwnerName, setOwnerName] = useInput('')
    const [accountNumber, onChangeAccountNumber, setAccountNumber] = useInput('', true)

    const active = bankName && ownerName && accountNumber

    useEffect(() => {
        if (!data) return
        if (!data.iUser.refundBankAccount) return
        setBankName(data.iUser.refundBankAccount.bankName)
        setOwnerName(data.iUser.refundBankAccount.ownerName)
        setAccountNumber(data.iUser.refundBankAccount.accountNumber)
    }, [data])

    const onSubmit = useCallback(async () => {
        if (!bankName) return
        if (!ownerName) return
        if (!accountNumber) return
        try {
            await updateRefundBankAccount({
                variables: {
                    accountNumber,
                    bankName,
                    ownerName
                }
            })
            goBack()
        } catch (error) {
            console.error(error)
        }
    }, [bankName, ownerName, accountNumber, updateRefundBankAccount])

    const onBank = useCallback(() => {
        setBankSelectorVisible(true)
    }, [])

    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior='padding'
                enabled={IS_IOS}
            >
                <DefaultHeader title='환불계좌' disableBtns />
                <View style={styles.body} >
                    <View style={styles.explanationContainer} >
                        <BaseText style={styles.explanation} >{`환불 가능한 계좌를 정확히 입력해주세요.\n승인취소가 불가능한 결제 건은 계좌 환불이 진행됩니다.`}</BaseText>
                    </View>
                    <View style={styles.bankSelectorContainer} >
                        <Pressable
                            onPress={onBank}
                            style={styles.bankSelector}
                        >
                            <BaseText style={{ color: bankName ? '#000' : GRAY }} >{bankName || '은행선택'}</BaseText>
                            <DownArrowIcon />
                        </Pressable>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={GRAY}
                            placeholder='예금주'
                            value={ownerName}
                            onChangeText={onChangeOwnerName}
                            style={[styles.text]}
                        />
                        <View style={styles.inputLine} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={GRAY}
                            placeholder='계좌번호'
                            value={accountNumber}
                            onChangeText={onChangeAccountNumber}
                            style={[styles.text]}
                            keyboardType='number-pad'
                        />
                        <View style={styles.inputLine} />
                    </View>
                </View>
            </KeyboardAvoidingView>
            <ButtonFooter
                active={active}
                onPress={onSubmit}
                text='환불계좌 변경'
                loading={loading}
            />
            <SelectBottomSheet
                visible={bankSelectorVisible}
                onClose={() => setBankSelectorVisible(false)}
                list={V_REFUND_BANKS}
                onSelect={(i) => setBankName(V_REFUND_BANKS[i])}
            />
        </ScreenLayout>
    )
}

export default RefundAccountScreen

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1
    },
    body: {
        flex: 1
    },
    explanationContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    explanation: {
        lineHeight: 32,
        color: GRAY
    },
    bankSelectorContainer: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: VERY_LIGHT_GRAY
    },
    bankSelector: {
        flex: 1,
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    inputContainer: {
        width: '100%',
        height: 56,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    inputLine: {
        height: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1,
        position: 'absolute',
        bottom: 0,
        right: 16,
        left: 16
    },
    text: {
        fontSize: 16,
        marginHorizontal: 16,
        padding: 0,
        fontFamily: 'BMJUA'
    }
})