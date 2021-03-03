import React from 'react'
import { StyleSheet, View } from 'react-native'
import BaseText from '../../components/BaseText'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { PaymentDetail } from '../../graphql/payment'
import moneyFormat from '../../lib/moneyFormat'



const OrderDetailPaymentInfo: React.FC<PaymentDetail> = ({ price, paymentMethod, deliveryPrice, extraDeliveryPrice, itemSale, couponSale, pointSale, totalPrice }) => {


    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >결제정보</BaseText>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >결제 방법</BaseText>
                <BaseText style={styles.content} >{paymentMethod}</BaseText>
            </View>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >상품 금액</BaseText>
                <BaseText style={styles.content} >{moneyFormat(price)}원</BaseText>
            </View>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >배송비</BaseText>
                <BaseText style={styles.content} >{moneyFormat(deliveryPrice)}원</BaseText>
            </View>
            {extraDeliveryPrice > 0 && <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >추가 배송비</BaseText>
                <BaseText style={styles.content} >{moneyFormat(extraDeliveryPrice)}원</BaseText>
            </View>}
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >상품 할인</BaseText>
                <BaseText style={styles.content} >-{moneyFormat(itemSale)}원</BaseText>
            </View>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >쿠폰 할인</BaseText>
                <BaseText style={styles.content} >-{moneyFormat(couponSale)}원</BaseText>
            </View>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >포인트 할인</BaseText>
                <BaseText style={styles.content} >-{moneyFormat(pointSale)}원</BaseText>
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
        color: GRAY
    },
    content: {
    }
})