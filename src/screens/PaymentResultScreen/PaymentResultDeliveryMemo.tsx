import React from 'react'
import { StyleSheet, View } from 'react-native'
import BaseText from '../../components/BaseText'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { CompletePayment } from '../../graphql/payment'


const PaymentResultDeliveryMemo: React.FC<CompletePayment> = ({ deliveryMemo }) => {
    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >배송메모</BaseText>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.content} >{deliveryMemo || '없음'}</BaseText>
            </View>
        </View>
    )
}

export default PaymentResultDeliveryMemo

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
        marginTop: 24
    },
    title: {
        fontSize: 18
    },
    content: {
        fontSize: 14,
        color: GRAY
    }
})