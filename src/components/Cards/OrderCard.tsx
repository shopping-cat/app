import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import BaseText from '../BaseText'
import BorderyButton from '../Buttons/BorderyButton'

const OrderCard: React.FC<any> = ({ id, date, name, state }) => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        navigate('OrderDetail', { id })
    }, [])
    ''
    const color = state.includes('구매') || state.includes('배송') ? COLOR2 : COLOR1

    return (
        <View style={styles.container} >
            <BaseText style={styles.id} >주문번호 {id}</BaseText>
            <BaseText style={styles.date} >{date}</BaseText>
            <BaseText style={styles.name} >{name}</BaseText>
            <BorderyButton style={styles.btn} onPress={onPress}>상세정보</BorderyButton>
            <BaseText style={[styles.state, { color }]} >{state}</BaseText>
        </View>
    )
}

export default OrderCard

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
