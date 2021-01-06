import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import ThinLine from '../../components/ThinLine'
import { GRAY } from '../../constants/styles'

const orderNumber = '15920593'

const PaymentResultSuccess = () => {
    return (
        <>
            <View style={styles.container} >
                <BaseText style={styles.successTitle} >주문이 완료되었어요!</BaseText>
                <BaseText style={styles.orderNumber} >주문번호 {orderNumber}</BaseText>
            </View>
            <ThinLine />
        </>
    )
}

export default PaymentResultSuccess

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 160,
        alignItems: 'center',
        justifyContent: 'center'
    },
    successTitle: {
        fontSize: 20,
        marginBottom: 16
    },
    orderNumber: {
        fontSize: 16,
        color: GRAY
    }
})
