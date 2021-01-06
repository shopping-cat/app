import React, { useState } from 'react'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import BaseText from '../../components/BaseText'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import { COLOR2, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import useInput from '../../hooks/useInput'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CASH_RECEIPT_TYPE = ['개인소득공제', '법인지출증빙', '미신청']

interface PaymnetDepositWithoutBankbookProps {
    onBank: () => void
    bank: string
}

const PaymnetDepositWithoutBankbook: React.FC<PaymnetDepositWithoutBankbookProps> = ({ bank, onBank }) => {

    const [name, onChangeName] = useInput('')
    const [cashReceiptType, setCashReceiptType] = useState(CASH_RECEIPT_TYPE[0])
    const [phone, onChangePhone] = useInput('')
    const [businessNumber, onChangeBusinessNumber] = useInput('')

    return (
        <View style={styles.container} >
            <Pressable
                onPress={onBank}
                style={styles.whiteBox}
            >
                <BaseText style={styles.whiteBoxText} >{bank}</BaseText>
                <DownArrowIcon fill={GRAY} />
            </Pressable>
            <View style={styles.whiteNameBox} >
                <TextInput
                    value={name}
                    onChangeText={onChangeName}
                    style={styles.whiteBoxText}
                    placeholder='입금자명'
                    placeholderTextColor={LIGHT_GRAY}
                />
            </View>
            <BaseText style={styles.cashReceipt} >현금영수증 신청</BaseText>
            <View style={styles.cashReceiptSelectorContainer} >
                {CASH_RECEIPT_TYPE.map(v =>
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
                    value={phone}
                    onChangeText={onChangePhone}
                    style={styles.whiteBoxText}
                    placeholder='휴대폰 번호'
                    placeholderTextColor={LIGHT_GRAY}
                    keyboardType='number-pad'
                />
            </View>}
            {cashReceiptType === '법인지출증빙' && <View style={styles.whiteInputBox} >
                <TextInput
                    value={businessNumber}
                    onChangeText={onChangeBusinessNumber}
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