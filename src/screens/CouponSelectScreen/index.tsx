import { Route, useRoute } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import CouponSelectBottomSheet from '../../components/BottomSheets/CouponSelectBottomSheet'
import CouponSelectCard from '../../components/Cards/CouponSelectCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import { ID } from '../../constants/types'
import { OrderCalculate } from '../../graphql/order'
import useCouponPoint from '../../hooks/useCouponPoint'

interface CouponSelectScreenProps {
    data: OrderCalculate
}

const CouponSelectScreen = () => {

    const { params } = useRoute<Route<'CouponSelect', CouponSelectScreenProps>>()
    const { couponIds, setCouponIds } = useCouponPoint()
    const [list, setList] = useState<any[]>([])
    const [visible, setVisible] = useState(false)

    const data = []
    for (const item of params.data.orderItems) {
        for (let i = 0; i < item.num; i++) {
            data.push({ ...item, num: i })
        }
    }

    const onCouponSelect = useCallback((id: ID) => {
        setList([])
        setVisible(true)
    }, [])

    const onCouponSelected = useCallback((index: number) => {
        console.log(index)
    }, [list])

    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <DefaultHeader title='쿠폰선택' disableBtns />
            <FlatList
                data={data}
                keyExtractor={(item) => `${item.id}/${item.num}`}
                renderItem={({ item, index }) =>
                    <CouponSelectCard
                        selected={couponIds !== null && couponIds[index] !== null}
                        data={item}
                        onCouponSelect={onCouponSelect}
                    />
                }
                overScrollMode='never'
            />
            <CouponSelectBottomSheet
                list={list}
                visible={visible}
                onClose={() => setVisible(false)}
                onSelect={onCouponSelected}
            />
        </ScreenLayout>
    )
}

export default CouponSelectScreen

const styles = StyleSheet.create({})
