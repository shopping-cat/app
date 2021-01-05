import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, COLOR2, GRAY } from '../../constants/styles'
import BaseText from '../BaseText'

const dummyImage = 'https://img.wethrift.com/the-cat-thing.jpg'
const dummySalePercent = 10
const dummySalePrice = 10000
const dummyCouponName = '고객 감사 쿠폰'
const dummyPeriod = '15일 남음' // timestamp

interface CouponSelectSheetCardProps {
    onPress: () => void
}

const CouponSelectSheetCard: React.FC<CouponSelectSheetCardProps> = ({ onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <Image
                source={{ uri: dummyImage }}
                style={styles.image}
            />
            <View style={styles.column} >
                <BaseText style={styles.sale} >{dummySalePercent ? dummySalePercent + '%' : dummySalePrice + '원'}</BaseText>
                <BaseText style={styles.name} >{dummyCouponName}</BaseText>
                <BaseText style={[styles.period, { color: GRAY || COLOR1 }]} >{dummyPeriod}</BaseText>
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
    sale: {
        fontSize: 18,
        color: COLOR2
    },
    name: {
    },
    period: {
        fontSize: 12
    }
})