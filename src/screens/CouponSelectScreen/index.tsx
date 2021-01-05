import React, { useCallback, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import CouponSelectBottomSheet from '../../components/BottomSheets/CouponSelectBottomSheet'
import CouponSelectCard from '../../components/Cards/CouponSelectCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import { ID } from '../../constants/types'

const dummyData = Array(10).fill({}).map((_, i) => ({ id: (i + 1).toString() }))

const CouponSelectScreen = () => {

    const [list, setList] = useState<any[]>([])
    const [visible, setVisible] = useState(false)

    const onCouponSelect = useCallback((id: ID, couponList: any[]) => {
        setList(couponList)
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
                data={dummyData}
                renderItem={() => <CouponSelectCard onCouponSelect={onCouponSelect} />}
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
