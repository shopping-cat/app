import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Clipboard from '@react-native-community/clipboard';
import BaseText from '../../components/BaseText'
import BorderyButton from '../../components/Buttons/BorderyButton'
import { COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'
import { PaymentDetail } from '../../graphql/payment';

// TODO
const message = '2020-01-11 23시 34분 까지 입금해 주세요\n시간안에 입금이 안될시에는 주문이 취소됩니다.'
const price = 159000
const name = '홍길동'
const bank = '우체국 1234567-123-42412'
const isProcessed = false


const OrderDetailDepositWithoutBankbook: React.FC<PaymentDetail> = ({ }) => {

    const onCopy = useCallback(() => {
        Clipboard.setString(bank)
    }, [bank])

    if (isProcessed) return null

    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >가상계좌</BaseText>
            <View style={styles.messageContainer} >
                <BaseText style={styles.message} >{message}</BaseText>
            </View>
            <View style={styles.infoContainer} >
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >입금 금액</BaseText>
                    <BaseText style={styles.infoContent} >{moneyFormat(price)}원</BaseText>
                </View>
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >입금자 명</BaseText>
                    <BaseText style={styles.infoContent} >{name}</BaseText>
                </View>
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >입금 은행</BaseText>
                    <BaseText style={styles.infoContent} >{bank}</BaseText>
                </View>
                <BorderyButton style={styles.copyBtn} onPress={onCopy}>계좌 복사</BorderyButton>
            </View>
        </View>
    )
}

export default OrderDetailDepositWithoutBankbook

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
        width: 80
    },
    infoContent: {
        flex: 1
    },
    copyBtn: {
        marginLeft: 80
    }
})
