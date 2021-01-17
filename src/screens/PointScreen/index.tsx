import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import PointCard from '../../components/Cards/PointCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'

const dummyData = Array(20).fill(0).map((_, i) => ({ id: i }))
const dummyPoint = 10350
const PointScreen = () => {
    return (
        <ScreenLayout>
            <DefaultHeader title='포인트' disableBtns />
            <FlatList
                overScrollMode='never'
                data={dummyData}
                renderItem={({ item }) => <PointCard {...item} />}
                ListHeaderComponent={
                    <BaseText style={styles.nowPoint} >현재 포인트 : {moneyFormat(dummyPoint)}포인트</BaseText>
                }
            />
        </ScreenLayout>
    )
}

export default PointScreen

const styles = StyleSheet.create({
    nowPoint: {
        marginLeft: 16,
        marginTop: 24,
        marginBottom: 8,
        fontSize: 16,
        color: GRAY
    }
})