import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'

const billingWay = '무통장 입금'
const price = 180000
const salePrice = 2400
const couponPrice = 7300
const pointPrice = 15300
const totalPrice = price - salePrice - couponPrice - pointPrice

const OrderDetailPaymentInfo = () => {


    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >결제정보</BaseText>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >결제 방법</BaseText>
                <BaseText style={styles.content} >{billingWay}</BaseText>
            </View>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >상품 금액</BaseText>
                <BaseText style={styles.content} >{moneyFormat(price)}원</BaseText>
            </View>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >상품 할인</BaseText>
                <BaseText style={styles.content} >-{moneyFormat(salePrice)}원</BaseText>
            </View>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >쿠폰 할인</BaseText>
                <BaseText style={styles.content} >-{moneyFormat(couponPrice)}원</BaseText>
            </View>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >포인트 할인</BaseText>
                <BaseText style={styles.content} >-{moneyFormat(pointPrice)}원</BaseText>
            </View>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >총 결제 금액</BaseText>
                <BaseText style={styles.content} >{moneyFormat(totalPrice)}원</BaseText>
            </View>
        </View>
    )
}

export default OrderDetailPaymentInfo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    labelContentContainer: {
        marginLeft: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 24,
        paddingRight: 24
    },
    title: {
        fontSize: 18
    },
    label: {
        fontSize: 16,
        color: GRAY
    },
    content: {
        fontSize: 16
    }
})