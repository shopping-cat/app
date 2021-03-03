import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { OrderDetailScreenProps } from '../../screens/OrderDetailScreen'
import { Payment } from '../../graphql/payment'
import dateFormat from '../../lib/dateFormat'
import BaseSkeletonPlaceHolder from '../BaseSkeletonPlaceHolder'
import BaseText from '../BaseText'
import BorderyButton from '../Buttons/BorderyButton'

const OrderCard: React.FC<Payment> = ({ id, createAt, name, state }) => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        const params: OrderDetailScreenProps = { id }
        navigate('OrderDetail', params)
    }, [id])

    const color = (state === '정상처리' || state == '구매접수' || state === '입금대기') ? COLOR2 : state === '취소처리' ? COLOR1 : GRAY

    return (
        <View style={styles.container} >
            <BaseText style={styles.id} >주문번호 {id}</BaseText>
            <BaseText style={styles.date} >{dateFormat(createAt)}</BaseText>
            <BaseText style={styles.name} >{name}</BaseText>
            <BorderyButton style={styles.btn} onPress={onPress}>상세정보</BorderyButton>
            <BaseText style={[styles.state, { color }]} >{state}</BaseText>
        </View>
    )
}

export default OrderCard

export const OrderCardSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={styles.container} >
                <View style={{ width: '20%', height: 16, borderRadius: 6 }} />
                <View style={{ width: '50%', height: 16, borderRadius: 6, marginTop: 16 }} />
                <View style={{ width: '50%', height: 16, borderRadius: 6, marginTop: 16 }} />
            </View>
        </BaseSkeletonPlaceHolder>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    id: {
        color: GRAY,
    },
    date: {
        color: GRAY,
        position: 'absolute',
        right: 0,
        top: 24
    },
    name: {
        marginVertical: 16
    },
    btn: {
        alignSelf: 'flex-start'
    },
    state: {
        position: 'absolute',
        bottom: 24,
        right: 0
    }
})
