import React, { useCallback } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { ID } from '../../constants/types'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'
import BorderyButton from '../Buttons/BorderyButton'

const dummyImage = 'https://ichef.bbci.co.uk/news/1024/cpsprodpb/83D7/production/_111515733_gettyimages-1208779325.jpg'
const dummyItemName = '딱해먹 고양이 구름다리 벽걸이'
const dummyItemOption = '해먹 | 배이지'
const dummyItemPrice = 79000
const dummyCoupons = Array(10).fill(0).map((_, i) => ({ id: (i + 1).toString() }))

interface CouponSelectCardProps {
    onCouponSelect: (id: ID, coupons: any[]) => void
}

const CouponSelectCard: React.FC<CouponSelectCardProps> = ({ onCouponSelect }) => {

    const couponSelected = false

    const onPress = useCallback(() => {
        if (dummyCoupons.length <= 0) return
        if (couponSelected) {

        } else {
            onCouponSelect(1, dummyCoupons)
        }
    }, [couponSelected])

    return (
        <View style={styles.container} >
            <Image
                style={styles.image}
                source={{ uri: dummyImage }}
            />
            <View style={styles.column} >
                <BaseText  >{dummyItemName}</BaseText>
                <BaseText style={styles.itemOption} >{dummyItemOption}</BaseText>
                <BaseText style={styles.itemPrice} >{moneyFormat(dummyItemPrice)}원</BaseText>
                <View style={styles.line} />
                {couponSelected && <BaseText style={styles.salePrice} >{moneyFormat(-3900)}원</BaseText>}
                <BorderyButton
                    active={dummyCoupons.length > 0}
                    onPress={onPress}
                    style={styles.btn}
                >
                    {couponSelected ? '취소' : '쿠폰사용'}
                </BorderyButton>
            </View>
        </View>
    )
}

export default CouponSelectCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexDirection: 'row'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    column: {
        flex: 1,
        paddingRight: 16,
        alignItems: 'flex-start'
    },
    itemOption: {
        color: GRAY,
        marginTop: 8,
        marginBottom: 16
    },
    itemPrice: {
        fontSize: 18,
        marginBottom: 8
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: VERY_LIGHT_GRAY,
        marginBottom: 8
    },
    salePrice: {
        fontSize: 18,
        color: COLOR2,
        marginBottom: 8
    },
    btn: {
        minWidth: 68
    }
})