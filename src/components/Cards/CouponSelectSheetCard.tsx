import dayjs from 'dayjs'
import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, COLOR2, GRAY } from '../../constants/styles'
import { Coupon } from '../../graphql/order'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../Text/BaseText'

interface CouponSelectSheetCardProps {
    onPress: () => void
    data: Coupon
}

const CouponSelectSheetCard: React.FC<CouponSelectSheetCardProps> = ({ onPress, data }) => {
    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <Image
                source={{ uri: data.image }}
                style={styles.image}
            />
            <View style={styles.column} >
                <View style={styles.row} >
                    <BaseText style={styles.sale} >{data.salePrice ? moneyFormat(data.salePrice) + '원' : data.salePercent + '%'}</BaseText>
                    {data.maxSalePrice && <BaseText style={styles.maxSalePrice} >(최대 {moneyFormat(data.maxSalePrice)}원 까지)</BaseText>}
                </View>
                <BaseText style={styles.name} >{data.name}</BaseText>
                <BaseText style={[styles.period, { color: GRAY || COLOR1 }]} >{dayjs(data.period).format('YYYY.MM.DD')} 까지</BaseText>
            </View>
        </Pressable>
    )
}

export default CouponSelectSheetCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        flexDirection: 'row'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    column: {
        height: 64,
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sale: {
        fontSize: 18,
        color: COLOR2
    },
    maxSalePrice: {
        color: GRAY,
        marginLeft: 4
    },
    name: {
    },
    period: {
        fontSize: 12
    }
})