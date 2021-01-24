import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import BaseText from '../../components/BaseText'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'

const dummyDeliveryInfo = {
    address: '부상 기장군 기장읍 백동길 24-4',
    addressDetail: '신림아파트 102호 1202호',
    phone: '01023958153',
    name: '홍길동',
    postCode: '46076'
}
// const dummyDeliveryInfo = null

const PaymentDeliveryInfo = () => {

    const { navigate } = useNavigation()

    const onModify = useCallback(() => {
        navigate('Address')
    }, [])

    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >배송지 정보</BaseText>
            <TouchableOpacity
                onPress={onModify}
                style={styles.modifyBtn}
            >
                <BaseText style={styles.modify} >{dummyDeliveryInfo ? '변경하기' : '입력하기'}</BaseText>
            </TouchableOpacity>

            {dummyDeliveryInfo &&
                <View>
                    <BaseText style={styles.info} >{dummyDeliveryInfo.name} {dummyDeliveryInfo.phone}</BaseText>
                    <View style={styles.spac} />
                    <BaseText style={styles.info} >{dummyDeliveryInfo.address}</BaseText>
                    <View style={styles.spac} />
                    <BaseText style={styles.info} >{dummyDeliveryInfo.addressDetail}</BaseText>
                </View>
            }
            {!dummyDeliveryInfo && <BaseText style={styles.emptyText} >배송지를 입력해주세요</BaseText>}

        </View>
    )
}

export default PaymentDeliveryInfo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
        marginBottom: 16
    },
    emptyText: {
        color: COLOR1
    },
    modifyBtn: {
        position: 'absolute',
        right: 16,
        top: 24,
        width: 56,
        height: 56,
        alignItems: 'flex-end'
    },
    modify: {
        color: COLOR2,
    },
    info: {
        color: GRAY
    },
    spac: {
        height: 10
    }
})
