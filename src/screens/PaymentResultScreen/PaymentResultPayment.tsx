import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'

const paymentMethod = '무통장 입금'
const paymentPrice = 159000

const PaymentResultPayment = () => {
    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >결제</BaseText>
            <View style={styles.infoContainer} >
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >결제 방법</BaseText>
                    <BaseText style={styles.infoContent} >{paymentMethod}</BaseText>
                </View>
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >결제 금액</BaseText>
                    <BaseText style={styles.infoContent} >{moneyFormat(paymentPrice)}원</BaseText>
                </View>
            </View>
        </View>
    )
}

export default PaymentResultPayment

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 24,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
        marginBottom: 24
    },
    infoContainer: {
        paddingHorizontal: 8
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24
    },
    infoTitle: {
        color: GRAY,
        fontSize: 16,
        width: 80
    },
    infoContent: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right'
    }
})