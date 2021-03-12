import React from 'react'
import { StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { PaymentDetail } from '../../graphql/payment'


const OrderDetailDeliveryMemo: React.FC<PaymentDetail> = ({ deliveryMemo }) => {
    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >배송메모</BaseText>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.content} >{deliveryMemo || '없음'}</BaseText>
            </View>
        </View>
    )
}

export default OrderDetailDeliveryMemo

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
        color: GRAY
    }
})