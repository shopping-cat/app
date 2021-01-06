import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import ThinLine from '../../components/ThinLine'
import { COLOR2 } from '../../constants/styles'

const errorMessage = '통장에 잔액이 부족합니다'

const PaymentResultError = () => {
    return (
        <>
            <View style={styles.cotnainer} >
                <BaseText style={styles.state} >주문이 실패했습니다.</BaseText>
            </View>
            <ThinLine />
            <BaseText style={styles.errorTitle} >에러 매세지</BaseText>
            <View style={styles.errorMessageContainerd} >
                <BaseText style={styles.errorMessage} >{errorMessage}</BaseText>
            </View>
        </>
    )
}

export default PaymentResultError

const styles = StyleSheet.create({
    cotnainer: {
        width: '100%',
        height: 160,
        alignItems: 'center',
        justifyContent: 'center'
    },
    state: {
        fontSize: 20
    },
    errorTitle: {
        fontSize: 20,
        marginVertical: 24,
        marginLeft: 16
    },
    errorMessageContainerd: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: COLOR2
    },
    errorMessage: {
        color: '#fff',
        fontSize: 16
    }
})
