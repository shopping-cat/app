import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Clipboard from '@react-native-community/clipboard';
import BaseText from '../../components/Text/BaseText'
import BorderyButton from '../../components/Buttons/BorderyButton'
import { COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'
import { CompletePayment } from '../../graphql/payment';


const PaymentResultDepositWithoutBankbook: React.FC<CompletePayment> = ({ vBankDate, vBankName, vBankNum, totalPrice }) => {

    const message = `${vBankDate} 까지 입금해 주세요\n시간안에 입금이 안될시에는 주문이 취소됩니다.` // TODO

    const onCopy = useCallback(() => {
        Clipboard.setString(vBankNum || '')
    }, [vBankNum])

    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >가상계좌</BaseText>
            <View style={styles.messageContainer} >
                <BaseText style={styles.message} >{message}</BaseText>
            </View>
            <View style={styles.infoContainer} >
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >입금 금액</BaseText>
                    <BaseText style={styles.infoContent} >{moneyFormat(totalPrice)}원</BaseText>
                </View>
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >입금자 명</BaseText>
                    <BaseText style={styles.infoContent} >{vBankName}</BaseText>
                </View>
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >입금 은행</BaseText>
                    <BaseText style={styles.infoContent} >{vBankName} {vBankNum}</BaseText>
                </View>
                <BorderyButton style={styles.copyBtn} onPress={onCopy}>계좌 복사</BorderyButton>
            </View>
        </View>
    )
}

export default PaymentResultDepositWithoutBankbook

const styles = StyleSheet.create({
    container: {
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1,
        paddingTop: 24
    },
    title: {
        fontSize: 18,
        marginBottom: 24,
        marginLeft: 16
    },
    messageContainer: {
        padding: 16,
        width: '100%',
        backgroundColor: COLOR2,
    },
    message: {
        color: '#fff',
        lineHeight: 20
    },
    infoContainer: {
        padding: 24,
        alignItems: 'flex-start'
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24
    },
    infoTitle: {
        color: GRAY,
        fontSize: 14,
        width: 80
    },
    infoContent: {
        fontSize: 14,
        flex: 1
    },
    copyBtn: {
        marginLeft: 80
    }
})
