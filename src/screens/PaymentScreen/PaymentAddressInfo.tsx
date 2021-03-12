import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { OrderCalculate } from '../../graphql/order'
import { PointSelectScreenProps } from '../PointSelectScreen'

interface PaymentDeliveryInfoProps {
    data: OrderCalculate
}

const PaymentDeliveryInfo: React.FC<PaymentDeliveryInfoProps> = ({ data }) => {

    const { navigate } = useNavigation()

    const onModify = useCallback(() => {
        const params: PointSelectScreenProps = { data }
        navigate('Address', params)
    }, [data])

    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >배송지 정보</BaseText>
            <TouchableOpacity
                onPress={onModify}
                style={styles.modifyBtn}
            >
                <BaseText style={styles.modify} >{data.user.deliveryInfo ? '변경하기' : '입력하기'}</BaseText>
            </TouchableOpacity>

            {data.user.deliveryInfo &&
                <View>
                    <BaseText style={styles.info} >{data.user.deliveryInfo.name} {data.user.deliveryInfo.phone}</BaseText>
                    <View style={styles.spac} />
                    <BaseText style={styles.info} >{data.user.deliveryInfo.address}</BaseText>
                    <View style={styles.spac} />
                    <BaseText style={styles.info} >{data.user.deliveryInfo.addressDetail}</BaseText>
                </View>
            }
            {!data.user.deliveryInfo && <BaseText style={styles.emptyText} >배송지를 입력해주세요</BaseText>}

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
