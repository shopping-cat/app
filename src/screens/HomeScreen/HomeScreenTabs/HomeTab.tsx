import { NetworkStatus, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../../components/Text/BaseText'
import ItemCard, { ItemCardSkeleton } from '../../../components/Cards/ItemCard'
import { WIDTH } from '../../../constants/styles'
import { useRecommendedItems } from '../../../graphql/item'
import useRefreshing from '../../../hooks/useRefreshing'
import makeIdArray from '../../../lib/makeIdArray'

const HomeTab = React.forwardRef<FlatList>((_, ref) => {

    const { data, loading, refetch, fetchMore } = useRecommendedItems()
    const { onRefresh, refreshing } = useRefreshing(refetch)


    return (
        <FlatList
            ref={ref}
            refreshing={refreshing}
            onRefresh={onRefresh}
            onEndReached={() => fetchMore({ variables: { offset: data?.recommendedItems.length } })}
            onEndReachedThreshold={0.4}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            style={styles.container}
            numColumns={2}
            data={loading ? makeIdArray(6) : data?.recommendedItems}
            renderItem={({ item }) => loading ? <ItemCardSkeleton /> : <ItemCard {...item} />}
            ListHeaderComponent={
                <View style={styles.headerContainer} >
                    <BaseText style={styles.headerTitle} >추천 상품</BaseText>
                </View>
            }
        />

    )
})

export default HomeTab

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        flex: 1,
        paddingLeft: 8
    },
    headerContainer: {
        paddingLeft: 8,
        height: 56,
        justifyContent: 'center'
    },
    headerTitle: {
        fontSize: 18
    }
})
