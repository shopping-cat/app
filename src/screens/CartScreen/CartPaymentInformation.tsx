import React from 'react'
import { StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { CartItem } from '../../graphql/cartItem'
import arraySum from '../../lib/arraySum'
import moneyFormat from '../../lib/moneyFormat'

interface CartPaymentInformationProps {
    data: CartItem[]
    selectList: number[]
}

const CartPaymentInformation: React.FC<CartPaymentInformationProps> = ({ data, selectList }) => {

    const selectedData = data.filter(v => selectList.includes(v.id))
    const totalPrice = arraySum(selectedData.map(v => (v.optionedPrice * v.num)))
    const totalPaymentItemPrice = arraySum(selectedData.map(v => (v.optionedSaledPrice * v.num)))
    const totalSale = totalPaymentItemPrice - totalPrice
    const deliveryPrice = arraySum(selectedData.map(v => v.item.deliveryPrice))
    const totalPaymentPrice = totalPaymentItemPrice + deliveryPrice
    const expectationPoint = Math.floor(totalPaymentPrice * 0.01)

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
                    <BaseText style={styles.priceText} >{moneyFormat(deliveryPrice)}원</BaseText>
                </View>
            </View>
            <View style={styles.container} >
                <View style={styles.textContainer} >
                    <BaseText style={styles.infoText} >총 {selectList.length}개 예상 결제 금액</BaseText>
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
