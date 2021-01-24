import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'

const dummyReason = '주문 실수'

const OrderDetailCancelInfo = () => {


    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >취소정보</BaseText>
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >취소사유</BaseText>
                <BaseText style={styles.content} >{dummyReason}</BaseText>
            </View>
        </View>
    )
}

export default OrderDetailCancelInfo

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
    label: {
        color: GRAY,
        width: 80
    },
    content: {
    }
})