import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import BaseButton from '../../components/Buttons/BaseButton'
import ItemCard from '../../components/Cards/ItemCard'
import HomeHeader from '../../components/Headers/HomeHeader'
import ScreenLayout from '../../components/Layout/ScreenLayout'
import { I_USER } from '../../graphql/auth'
import { useItems } from '../../graphql/item'
import useAuth from '../../hooks/useAuth'
import { client } from '../../lib/apollo'

const HomeScreen = () => {

    const { navigate } = useNavigation()
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
        <ScreenLayout >
            <HomeHeader />
            <BaseButton style={{ width: 100, height: 100 }} onPress={logout} >
                <Text>logout</Text>
            </BaseButton>
            <BaseButton style={{ width: 100, height: 100 }} onPress={() => navigate('ItemDetail')} >
                <Text>ItemDetail</Text>
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
        </ScreenLayout>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
