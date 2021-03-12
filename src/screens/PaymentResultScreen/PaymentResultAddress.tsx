import React from 'react'
import { StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { CompletePayment } from '../../graphql/payment'
import phoneFormat from '../../lib/phoneFormat'


const PaymentResultAddress: React.FC<CompletePayment> = ({ address, addressName, addressPhone }) => {
    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >배송지</BaseText>
            <View style={styles.infoContainer} >
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >받는분</BaseText>
                    <BaseText style={styles.infoContent} >{addressName}</BaseText>
                </View>
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >주소</BaseText>
                    <BaseText style={styles.infoContent} >{address}</BaseText>
                </View>
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >연락처</BaseText>
                    <BaseText style={styles.infoContent} >{phoneFormat(addressPhone)}</BaseText>
                </View>
            </View>
        </View>
    )
}

export default PaymentResultAddress

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
        paddingLeft: 8
    },
    info: {
        flexDirection: 'row',
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
        lineHeight: 20
    }
})