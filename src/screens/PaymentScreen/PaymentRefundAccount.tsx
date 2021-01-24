import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import BaseText from '../../components/BaseText'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'

const refundAccount = {
    name: '홍길동',
    accountNumber: '0294109249022',
    bank: '농협'
}
// const refundAccount = null

const PaymentRefundAccount = () => {

    const { navigate } = useNavigation()

    const onModify = useCallback(() => {
        navigate('RefundAccount')
    }, [])

    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >환불계좌</BaseText>
            <TouchableOpacity
                onPress={onModify}
                style={styles.modifyBtn}
            >
                <BaseText style={styles.modify} >{refundAccount ? '변경하기' : '입력하기'}</BaseText>
            </TouchableOpacity>

            {refundAccount &&
                <View>
                    <BaseText style={styles.info} >{refundAccount.name} | {refundAccount.bank} {refundAccount.accountNumber}</BaseText>
                </View>
            }
            {!refundAccount && <BaseText style={styles.emptyText} >배송지를 입력해주세요</BaseText>}

        </View>
    )
}

export default PaymentRefundAccount

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
        marginBottom: 16
    },
    emptyText: {
        color: COLOR1
    },
    modifyBtn: {
        position: 'absolute',
        right: 16,
        top: 24,
        width: 56,
        height: 56,
        alignItems: 'flex-end'
    },
    modify: {
        color: COLOR2,
    },
    info: {
        color: GRAY
    },
    spac: {
        height: 10
    }
})
