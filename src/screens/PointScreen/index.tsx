import React, { useEffect } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import PointCard, { PointCardSkeleton } from '../../components/Cards/PointCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { GRAY } from '../../constants/styles'
import { usePointReceipts } from '../../graphql/pointReceipt'
import makeIdArray from '../../lib/makeIdArray'
import moneyFormat from '../../lib/moneyFormat'

const PointScreen = () => {

    const { data, loading, fetchMore } = usePointReceipts({ fetchPolicy: 'network-only' })

    return (
        <ScreenLayout>
            <DefaultHeader title='포인트' disableBtns />
            <FlatList
                overScrollMode='never'
                onEndReached={() => fetchMore({
                    variables: { offset: data?.pointReceipts.length }
                })}
                onEndReachedThreshold={0.4}
                keyExtractor={(item) => item.id.toString()}
                data={loading ? makeIdArray(8) : data?.pointReceipts as any}
                renderItem={({ item }) => loading ? <PointCardSkeleton /> : <PointCard {...item} />}
                ListHeaderComponent={<>
                    {!loading && <BaseText style={styles.nowPoint} >현재 포인트 : {moneyFormat(data?.iUser.point || 0)}포인트</BaseText>}
                </>}
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