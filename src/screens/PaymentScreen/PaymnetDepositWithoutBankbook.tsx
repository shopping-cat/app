import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import BaseText from '../../components/BaseText'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import { COLOR2, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import useInput from '../../hooks/useInput'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { CASH_RECEIPT_TYPES } from '../../constants/values'



interface PaymnetDepositWithoutBankbookProps {
    bank: string | null
    cashReceiptName: string
    cashReceiptType: string
    cashReceiptNumber: string
    onBank: () => void
    onChangeCashReceiptName: (t: string) => void
    setCashReceiptType: (t: string) => void
    onChangeReceiptNumber: (t: string) => void
}

const PaymnetDepositWithoutBankbook: React.FC<PaymnetDepositWithoutBankbookProps> = ({ bank, onBank, cashReceiptNumber, cashReceiptType, onChangeReceiptNumber, setCashReceiptType, cashReceiptName, onChangeCashReceiptName }) => {

    useEffect(() => {
        onChangeReceiptNumber('')
    }, [cashReceiptType])

    return (
        <View style={styles.container} >
            <Pressable
                onPress={onBank}
                style={styles.whiteBox}
            >
                <BaseText style={styles.whiteBoxText} >{bank || '은행을 선택해주세요'}</BaseText>
                <DownArrowIcon fill={GRAY} />
            </Pressable>
            <View style={styles.whiteNameBox} >
                <TextInput
                    value={cashReceiptName}
                    onChangeText={onChangeCashReceiptName}
                    style={styles.whiteBoxText}
                    placeholder='입금자명'
                    placeholderTextColor={LIGHT_GRAY}
                />
            </View>
            <BaseText style={styles.cashReceipt} >현금영수증 신청</BaseText>
            <View style={styles.cashReceiptSelectorContainer} >
                {CASH_RECEIPT_TYPES.map(v =>
                    <Pressable
                        key={v}
                        onPress={() => setCashReceiptType(v)}
                        style={styles.cashReceiptToggleContainer}
                    >
                        <Icon
                            color={cashReceiptType === v ? COLOR2 : GRAY}
                            name={cashReceiptType === v ? 'radiobox-marked' : 'radiobox-blank'}
                            size={16}
                        />
                        <BaseText style={styles.cashReceiptToggleText} >{v}</BaseText>
                    </Pressable>
                )}
            </View>
            {cashReceiptType === '개인소득공제' && <View style={styles.whiteInputBox} >
                <TextInput
                    value={cashReceiptNumber}
                    onChangeText={onChangeReceiptNumber}
                    style={styles.whiteBoxText}
                    placeholder='휴대폰 번호'
                    placeholderTextColor={LIGHT_GRAY}
                    keyboardType='number-pad'
                />
            </View>}
            {cashReceiptType === '법인지출증빙' && <View style={styles.whiteInputBox} >
                <TextInput
                    value={cashReceiptNumber}
                    onChangeText={onChangeReceiptNumber}
                    style={styles.whiteBoxText}
                    placeholder='사업자 번호'
                    placeholderTextColor={LIGHT_GRAY}
                    keyboardType='number-pad'
                />
            </View>}
        </View>
    )
}

export default PaymnetDepositWithoutBankbook

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: VERY_LIGHT_GRAY
    },
    whiteBox: {
        width: '100%',
        height: 48,
        borderRadius: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    whiteNameBox: {
        width: '100%',
        height: 48,
        borderRadius: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24,
        marginTop: 16
    },
    whiteInputBox: {
        width: '100%',
        height: 48,
        borderRadius: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 16
    },
    whiteBoxText: {
        color: GRAY,
        padding: 0,
        flex: 1,
        fontFamily: 'BMJUA'
    },
    cashReceipt: {
        fontSize: 16,
        marginBottom: 24
    },
    cashReceiptSelectorContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cashReceiptToggleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16
    },
    cashReceiptToggleText: {
        color: GRAY,
        marginLeft: 8
    }
})