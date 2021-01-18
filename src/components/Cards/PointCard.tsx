import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'

const dummyDate = '2020.05.18'
const dummyTitle = '이벤트 적립'
const dummyPoint = 1200

const PointCard = () => {
    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >{dummyTitle}</BaseText>
            <BaseText style={[styles.point, { color: dummyPoint >= 0 ? COLOR2 : COLOR1 }]} >{moneyFormat(dummyPoint, true)}</BaseText>
            <BaseText style={styles.date} >{dummyDate}</BaseText>
        </View>
    )
}

export default PointCard

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        marginHorizontal: 16,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    title: {
        marginBottom: 16,
        fontSize: 16
    },
    point: {
        fontSize: 16
    },
    date: {
        color: GRAY,
        position: 'absolute',
        right: 0,
        top: 24
    }
})
