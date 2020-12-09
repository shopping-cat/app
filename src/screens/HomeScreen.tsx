import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import BaseButton from '../components/BaseButton'
import ItemCard from '../components/Cards/ItemCard'
import HomeHeader from '../components/Headers/HomeHeader'
import { I_USER } from '../graphql/auth'
import { useItems } from '../graphql/item'
import useAuth from '../hooks/useAuth'
import { client } from '../lib/apollo'

const HomeScreen = () => {

    // const { data, refetch, fetchMore } = useItems({ fetchPolicy: 'network-only' })
    // const [refreshing, setRefresing] = useState(false)
    const { logout } = useAuth()

    useEffect(() => {
        client.query({ query: I_USER })
    }, [])
    // const onRefresh = useCallback(async () => {
    //     try {
    //         if (refreshing) return
    //         setRefresing(true)
    //         await refetch()
    //     } catch (error) {
    //         console.log(error)
    //     } finally {
    //         setRefresing(false)
    //     }
    // }, [refreshing, refetch])

    // const onEndReached = useCallback(async () => {
    //     if (!data) return
    //     await fetchMore({ variables: { offset: data.items.length } })
    // }, [data, fetchMore])

    return (
        <View style={{ flex: 1 }} >
            <HomeHeader />
            <BaseButton style={{ width: 100, height: 100, backgroundColor: 'red' }} onPress={logout} >
                <Text>logout</Text>
            </BaseButton>
            {/* <FlatList
                onRefresh={onRefresh}
                refreshing={refreshing}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
                style={{ paddingHorizontal: 16 }}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                data={data?.items || []}
                renderItem={({ item }) => <ItemCard {...item} />}
                ListFooterComponent={<ActivityIndicator style={{ marginVertical: 24 }} />}
            /> */}
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
