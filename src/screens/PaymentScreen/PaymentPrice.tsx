import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import RightArrowIcon from '../../components/Svgs/RightArrowIcon'
import { COLOR1, COLOR2, GRAY, SPRING_CONFIG, VERY_LIGHT_GRAY } from '../../constants/styles'
import { OrderCalculate } from '../../graphql/order'
import useCouponPoint from '../../hooks/useCouponPoint'
import moneyFormat from '../../lib/moneyFormat'
import { PointSelectScreenProps } from '../PointSelectScreen'

interface PaymentPriceProps {
    data: OrderCalculate
}

const PaymentPrice: React.FC<PaymentPriceProps> = ({ data }) => {

    const { navigate } = useNavigation()
    // animation state
    const [open, setOpen] = useState(true)
    const [animation] = useState(new Animated.Value(1))
    const [contentsHeight, setContentsHeight] = useState(0)

    const { coupons, point } = useCouponPoint()
    // 중복 제거된 쿠폰 id 리스트
    const couponIds: string[] = []
    data.orderItemsCoupons.forEach(v => v.coupons.forEach(v => couponIds.push(v.id)))
    const deduplicatedCouponIds = Array.from(new Set(couponIds))


    const onCoupon = useCallback(() => {
        const params = { data }
        navigate('CouponSelect', params)
    }, [data])

    const onPoint = useCallback(() => {
        const params: PointSelectScreenProps = { data }
        navigate('PointSelect', params)
    }, [data])

    const onAccordian = useCallback(() => {
        if (!open) Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: false,
            ...SPRING_CONFIG
        }).start()
        else Animated.timing(animation, {
            toValue: 0,
            useNativeDriver: false,
            duration: 250
        }).start()
        setOpen(!open)
    }, [open])

    const height = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [68, contentsHeight + 68]
    })

    return (
        <View>
            <Animated.View style={[styles.container, { height }]} >
                <Pressable
                    onPress={onAccordian}
                    style={styles.titleContainer}
                >
                    <BaseText style={styles.title}  >결제금액</BaseText>
                    <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }} >
                        <DownArrowIcon fill='#000' />
                    </View>
                </Pressable>
                <View
                    style={styles.contentContainer}
                    onLayout={({ nativeEvent }) => setContentsHeight(nativeEvent.layout.height)}
                >
                    <View style={styles.couponCotnainer} >
                        <View style={styles.couponInfoContainer} >
                            <BaseText style={styles.couponeText} >쿠폰</BaseText>
                            <BaseText style={[styles.couponeText, { color: coupons.length > 0 ? GRAY : COLOR1 }]}>{coupons.length > 0 ? `${coupons.length}장 적용` : `전체 ${data.user.couponNum}장, 적용가능 ${deduplicatedCouponIds.length}장`}</BaseText>
                        </View>
                        <Pressable onPress={onCoupon} style={styles.couponBtn} >
                            <RightArrowIcon fill={GRAY} />
                        </Pressable>
                    </View>
                    <View style={styles.couponCotnainer} >
                        <View style={styles.couponInfoContainer} >
                            <BaseText style={styles.couponeText} >포인트</BaseText>
                            <BaseText style={[styles.couponeText, { color: point === 0 ? COLOR1 : GRAY }]}>{point === 0 ? `${moneyFormat(data.maxPointPrice)}포인트 사용가능` : `${moneyFormat(point)}포인트 적용`} </BaseText>
                        </View>
                        <Pressable onPress={onPoint} style={styles.couponBtn} >
                            <RightArrowIcon fill={GRAY} />
                        </Pressable>
                    </View>
                    <View style={styles.couponPricesSpac} />
                    <View style={styles.pricesContainer} >
                        <BaseText style={styles.pricesTitle} >총 상품금액</BaseText>
                        <BaseText style={styles.pricesPrice} >{moneyFormat(data.totalItemPrice)}원</BaseText>
                    </View>
                    <View style={styles.pricesContainer} >
                        <BaseText style={styles.pricesTitle} >배송비</BaseText>
                        <BaseText style={styles.pricesPrice} >{moneyFormat(data.totalDeliveryPrice)}원</BaseText>
                    </View>
                    {data.totalExtraDeliveryPrice > 0 && <View style={styles.pricesContainer} >
                        <BaseText style={[styles.pricesTitle, { color: COLOR2 }]} >도서산간지역 추가 배송비</BaseText>
                        <BaseText style={styles.pricesPrice} >{moneyFormat(data.totalExtraDeliveryPrice)}원</BaseText>
                    </View>}
                    <View style={styles.pricesContainer} >
                        <BaseText style={styles.pricesTitle} >상품 할인</BaseText>
                        <BaseText style={styles.pricesPrice} >{moneyFormat(-data.totalSale)}원</BaseText>
                    </View>
                    <View style={styles.pricesContainer} >
                        <BaseText style={styles.pricesTitle} >쿠폰 할인</BaseText>
                        <BaseText style={styles.pricesPrice} >{moneyFormat(-data.totalCouponSale)}원</BaseText>
                    </View>
                    <View style={styles.pricesContainer} >
                        <BaseText style={styles.pricesTitle} >포인트 할인</BaseText>
                        <BaseText style={styles.pricesPrice} >{moneyFormat(-data.totalPointSale)}원</BaseText>
                    </View>
                </View>
            </Animated.View>
            <View style={styles.totalPrieceContainer} >
                <BaseText style={styles.title} >총 결제금액</BaseText>
                <BaseText style={styles.totalPrice} >{moneyFormat(data.totalPaymentPrice)}원</BaseText>
            </View>
        </View>
    )
}

export default PaymentPrice

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden'
    },
    titleContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        height: 68,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    contentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0, right: 0,
        zIndex: -1
    },
    title: {
        fontSize: 18
    },
    totalPrieceContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1,
        borderTopColor: VERY_LIGHT_GRAY,
        borderTopWidth: 1
    },
    totalPrice: {
        fontSize: 16,
        color: COLOR1
    },
    couponCotnainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row'
    },
    couponInfoContainer: {
        flex: 1,
        height: '100%',
        marginLeft: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1,
    },
    couponBtn: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 16
    },
    couponeText: {
        fontSize: 14,
        color: GRAY
    },
    couponPricesSpac: {
        height: 32
    },
    pricesContainer: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 32
    },
    pricesTitle: {
        fontSize: 14,
        color: GRAY
    },
    pricesPrice: {
        fontSize: 14
    }
})
