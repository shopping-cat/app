import React, { useCallback } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { ID } from '../../constants/types'
import { Coupon, OrderItem, OrderItemsCoupons } from '../../graphql/order'
import useCouponPoint from '../../hooks/useCouponPoint'
import arraySum from '../../lib/arraySum'
import moneyFormat from '../../lib/moneyFormat'
import salePrice from '../../lib/salePrice'
import BaseText from '../Text/BaseText'
import BorderyButton from '../Buttons/BorderyButton'

interface CouponSelectCardProps {
    onCouponSelect: (id: ID) => void
    data: OrderItem
    orderItemsCoupons: OrderItemsCoupons[]
}

const CouponSelectCard: React.FC<CouponSelectCardProps> = ({ onCouponSelect, data, orderItemsCoupons }) => {

    const { coupons, setCoupons } = useCouponPoint()


    let currentOrderItemsCoupons: Coupon[] = [] // 해당 orderId의 적용 가능한 쿠폰 리스트
    let selectAbleCouponList: Coupon[] = [] // 추가로 선택 가능한 쿠폰 리스트
    const orderItemsCouponsTemp = orderItemsCoupons.find(v => v.orderItemId === data.id)
    if (orderItemsCouponsTemp) {
        currentOrderItemsCoupons = orderItemsCouponsTemp.coupons
        selectAbleCouponList = currentOrderItemsCoupons.filter(v => !coupons.map(v => v.couponId).includes(v.id)) // 이미 선택된 쿠폰은 제외
    }

    const currentCoupons = coupons.filter(v => v.orderItemId === data.id) // 선택된 쿠폰 리스트

    const couponedPrices: number[] = []
    for (let i = 0; i < data.num; i++) {
        let basicPrice = data.optionedSaledPrice
        if (currentCoupons.length > i) {
            const currentCouponId = currentCoupons[i].couponId
            const coupon = currentOrderItemsCoupons.find(v => v.id === currentCouponId)
            if (coupon) {
                if (coupon.salePrice) {
                    basicPrice -= coupon.salePrice
                    if (basicPrice < 0) basicPrice = 0 // clamp
                }
                if (coupon.salePercent) {
                    basicPrice = salePrice(coupon.salePercent, basicPrice)
                    if (coupon.maxSalePrice && data.optionedSaledPrice - basicPrice > coupon.maxSalePrice) { // maxSalePrice 처리
                        basicPrice = data.optionedSaledPrice - coupon.maxSalePrice
                    }
                }
            }
        }
        couponedPrices.push(basicPrice)
    }

    const totalPrice = arraySum(couponedPrices)


    const onPress = useCallback(() => {
        if (selectAbleCouponList.length === 0) return
        onCouponSelect(data.id)
    }, [data, onCouponSelect, selectAbleCouponList])

    const onCancel = useCallback((couponId: string) => {
        setCoupons(coupons.filter(v => v.couponId !== couponId))
    }, [setCoupons, coupons])

    return (
        <View style={styles.container} >
            <View style={styles.itemInfo} >
                <Image
                    style={styles.image}
                    source={{ uri: data.item.mainImage }}
                />
                <View style={styles.itemInfoTextContainer} >
                    <BaseText numberOfLines={1} >{data.item.name}</BaseText>
                    <BaseText style={styles.itemOption} numberOfLines={1} >{data.stringOption || '옵션 없음'}</BaseText>
                    <BaseText style={styles.itemOption} >{data.num}개</BaseText>
                </View>
            </View>

            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >기본 가격</BaseText>
                <BaseText style={styles.itemPrice} >{moneyFormat(data.optionedSaledPrice * data.num)}원</BaseText>
            </View>
            <View style={styles.line} />

            {currentCoupons.map((v, i) => // 쿠폰 적용 가격 + 취소
                <View key={v.couponId + v.orderItemId} style={styles.labelContentContainer} >
                    <View style={styles.row} >
                        <BaseText style={styles.label} >상품{i + 1}.</BaseText>
                        <BorderyButton
                            active
                            onPress={() => onCancel(v.couponId)}
                            style={styles.btn}
                        >
                            {'취소'}
                        </BorderyButton>
                    </View>
                    <BaseText style={styles.salePrice} >{moneyFormat(couponedPrices[i] - data.optionedSaledPrice)}원</BaseText>
                </View>
            )}

            {currentCoupons.length < data.num && <View style={styles.labelContentContainer} >
                <View style={styles.row} >
                    <BaseText style={styles.label} >상품{currentCoupons.length + 1}.</BaseText>
                    <BorderyButton
                        active={selectAbleCouponList.length > 0}
                        onPress={onPress}
                        style={styles.btn}
                    >
                        {selectAbleCouponList.length > 0 ? '쿠폰선택' : '적용불가'}
                    </BorderyButton>
                </View>
            </View>}

            <View style={styles.line} />
            <View style={styles.labelContentContainer} >
                <BaseText style={styles.label} >쿠폰 적용 가격</BaseText>
                <BaseText style={styles.itemPrice} >{moneyFormat(totalPrice)}원</BaseText>
            </View>
        </View>
    )
}

export default CouponSelectCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 24,
        marginTop: 24
    },
    itemInfo: {
        flexDirection: 'row',
        marginBottom: 24
    },
    itemInfoTextContainer: {
        justifyContent: 'space-between'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
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
    },
    itemPrice: {
        fontSize: 18
    },
    labelContentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16
    },
    label: {
        color: GRAY,
        minWidth: 50
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: VERY_LIGHT_GRAY,
        marginBottom: 16
    },
    salePrice: {
        fontSize: 18,
        color: COLOR2,
    },
    btn: {
        minWidth: 68
    }
})