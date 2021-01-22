import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'

const name = '홍길동'
const address = '부산 기장군 기장읍 백길동 14-3, 123동 567호'
const phone = '010-1234-1512'

const OrderDetailAddress = () => {
    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >배송지</BaseText>
            <View style={styles.infoContainer} >
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >받는분</BaseText>
                    <BaseText style={styles.infoContent} >{name}</BaseText>
                </View>
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >주소</BaseText>
                    <BaseText style={styles.infoContent} >{address}</BaseText>
                </View>
                <View style={styles.info} >
                    <BaseText style={styles.infoTitle} >연락처</BaseText>
                    <BaseText style={styles.infoContent} >{phone}</BaseText>
                </View>
            </View>
        </View>
    )
}

export default OrderDetailAddress

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
        fontSize: 16,
        width: 80
    },
    infoContent: {
        fontSize: 16,
        flex: 1,
        lineHeight: 20
    }
})