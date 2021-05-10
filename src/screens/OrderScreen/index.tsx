import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import OrderCard, { OrderCardSkeleton } from '../../components/Cards/OrderCard'
import { usePayments } from '../../graphql/payment'
import makeIdArray from '../../lib/makeIdArray'
import EmptyView from '../../components/View/EmptyView'


const OrderScreen = () => {

    const { data, fetchMore, loading } = usePayments({ fetchPolicy: 'network-only' })

    return (
        <ScreenLayout>
            <DefaultHeader title='주문내역' disableBtns />
            <FlatList
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                onEndReached={() => fetchMore({
                    variables: { offset: data?.payments.length }
                })}
                onEndReachedThreshold={0.4}
                data={loading ? makeIdArray(6, true) : data?.payments as any}
                renderItem={({ item }) => loading ? <OrderCardSkeleton /> : <OrderCard {...item} />}
            />
            {data?.payments.length === 0 && <EmptyView />}
        </ScreenLayout>
    )
}

export default OrderScreen

const styles = StyleSheet.create({})
