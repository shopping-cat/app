import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { PointReceipt } from '../../graphql/pointReceipt'
import dateFormat from '../../lib/dateFormat'
import moneyFormat from '../../lib/moneyFormat'
import BaseSkeletonPlaceHolder from '../BaseSkeletonPlaceHolder'
import BaseText from '../BaseText'

const PointCard: React.FC<PointReceipt> = ({ createdAt, name, point }) => {
    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >{name}</BaseText>
            <BaseText style={[styles.point, { color: point >= 0 ? COLOR2 : COLOR1 }]} >{moneyFormat(point, true)}</BaseText>
            <BaseText style={styles.date} >{dateFormat(createdAt)}</BaseText>
        </View>
    )
}

export default PointCard

export const PointCardSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={styles.container} >
                <View style={{ width: '50%', height: 16, borderRadius: 6 }} />
                <View style={{ width: '35%', height: 16, borderRadius: 6, marginTop: 16 }} />
            </View>
        </BaseSkeletonPlaceHolder>
    )
}

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
