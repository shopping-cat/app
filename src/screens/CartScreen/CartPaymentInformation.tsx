import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'

interface CartPaymentInformationProps {

}

const CartPaymentInformation: React.FC<CartPaymentInformationProps> = ({ }) => {


    const totalPrice = 169800
    const totalSale = -14800
    const deleveryPrice = 2500
    const totalPaymentPrice = 156000
    const selectedNum = 3
    const expectationPoint = Math.floor(totalPaymentPrice * 0.02)

    return (
        <View>
            <View style={styles.container} >
                <View style={styles.textContainer} >
                    <BaseText style={styles.infoText} >총 상품금액</BaseText>
                    <BaseText style={styles.priceText} >{moneyFormat(totalPrice)}원</BaseText>
                </View>
                <View style={styles.textContainer} >
                    <BaseText style={styles.infoText} >상품 할인</BaseText>
                    <BaseText style={styles.priceText} >{moneyFormat(totalSale)}원</BaseText>
                </View>
                <View style={styles.textContainer} >
                    <BaseText style={styles.infoText} >배송비</BaseText>
                    <BaseText style={styles.priceText} >{moneyFormat(deleveryPrice)}원</BaseText>
                </View>
            </View>
            <View style={styles.container} >
                <View style={styles.textContainer} >
                    <BaseText style={styles.infoText} >총 {selectedNum}개 주문금액</BaseText>
                    <BaseText style={styles.totalPaymentPriceText} >{moneyFormat(totalPaymentPrice)}원</BaseText>
                </View>
                <View style={styles.textContainer} >
                    <BaseText style={styles.infoText} >예상 적립포인트</BaseText>
                    <BaseText style={styles.priceText} >{moneyFormat(expectationPoint)}원</BaseText>
                </View>
            </View>
        </View>
    )
}

export default CartPaymentInformation

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1
    },
    totalPaymentPriceText: {
        fontSize: 16,
        color: COLOR1
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12
    },
    infoText: {
        fontSize: 14,
        color: GRAY
    },
    priceText: {
        fontSize: 14
    }
})
