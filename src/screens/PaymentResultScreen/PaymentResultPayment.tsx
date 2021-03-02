import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { CompletePayment } from '../../graphql/payment'
import moneyFormat from '../../lib/moneyFormat'


const PaymentResultPayment: React.FC<CompletePayment> = ({ paymentMethod, totalPrice }) => {
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
                    <BaseText style={styles.infoContent} >{moneyFormat(totalPrice)}원</BaseText>
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
        fontSize: 14,
        width: 80
    },
    infoContent: {
        fontSize: 14,
        flex: 1,
        textAlign: 'right'
    }
})