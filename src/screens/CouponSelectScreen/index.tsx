import { Route, useRoute } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CouponSelectBottomSheet from '../../components/BottomSheets/CouponSelectBottomSheet'
import CouponSelectCard from '../../components/Cards/CouponSelectCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import { ID } from '../../constants/types'
import { Coupon, OrderCalculate, OrderItem } from '../../graphql/order'
import useCouponPoint from '../../hooks/useCouponPoint'

interface CouponSelectScreenProps {
    data: OrderCalculate
}

const CouponSelectScreen = () => {

    const { params } = useRoute<Route<'CouponSelect', CouponSelectScreenProps>>()
    const { bottom } = useSafeAreaInsets()
    const { coupons, setCoupons } = useCouponPoint()
    const [currentOrderItemId, setCurrentOrderItemId] = useState<number | null>(null) // 선택한 orderITtemId
    const [list, setList] = useState<Coupon[]>([])
    const [visible, setVisible] = useState(false)

    const onCouponSelect = useCallback((orderItemId: ID) => {
        const orderItemsCouponsTemp = params.data.orderItemsCoupons.filter(v => v.orderItemId === orderItemId)
        if (orderItemsCouponsTemp.length === 1) {
            const couponsTemp = orderItemsCouponsTemp[0].coupons
            setList(couponsTemp.filter(v => !coupons.map(v => v.couponId).includes(v.id))) // 이미 선택된 쿠폰은 제외
        } else {
            setList([])
        }
        setVisible(true)
        setCurrentOrderItemId(orderItemId)
    }, [params, coupons])

    const onBottomSheetCouponSelected = useCallback((couponId: string) => {
        if (!currentOrderItemId) return
        setCoupons([
            ...coupons,
            {
                couponId,
                orderItemId: currentOrderItemId
            }
        ])
        setCurrentOrderItemId(null)
    }, [list, coupons, setCoupons, currentOrderItemId])

    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <DefaultHeader title='쿠폰선택' disableBtns />
            <FlatList
                data={params.data.orderItems}
                keyExtractor={(item) => `${item.id}/${item.num}`}
                renderItem={({ item }) =>
                    <CouponSelectCard
                        data={item}
                        onCouponSelect={onCouponSelect}
                        orderItemsCoupons={params.data.orderItemsCoupons}
                    />
                }
                overScrollMode='never'
                ListFooterComponent={<View style={{ height: bottom }} />}
            />
            <CouponSelectBottomSheet
                list={list}
                visible={visible}
                onClose={() => setVisible(false)}
                onSelect={onBottomSheetCouponSelected}
            />
        </ScreenLayout>
    )
}

export default CouponSelectScreen

const styles = StyleSheet.create({})
