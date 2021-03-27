import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ItemCard, { ItemCardSkeleton } from '../../../components/Cards/ItemCard'
import { WIDTH } from '../../../constants/styles'
import { Category } from '../../../constants/types'
import { useFilteredItems } from '../../../graphql/item'
import useRefreshing from '../../../hooks/useRefreshing'
import makeIdArray from '../../../lib/makeIdArray'

interface BsetTabProps {
    category1: Category
    category2: Category
}

const BestTab = React.forwardRef<FlatList, BsetTabProps>(({ category1, category2 }, ref) => {

    const { data, refetch, fetchMore, loading } = useFilteredItems({
        variables: {
            orderBy: '인기순',
            category1,
            category2
        }
    })
    const { onRefresh, refreshing } = useRefreshing(refetch)


    return (
        <View style={{ flex: 1 }} >
            <View style={styles.marginTop} />
            <FlatList
                ref={ref}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={() => fetchMore({
                    variables: { offset: data?.filteredItems.length }
                })}
                onEndReachedThreshold={0.4}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapperStyle}
                numColumns={2}
                style={styles.container}
                data={loading ? makeIdArray(6) : data?.filteredItems}
                renderItem={({ item }) => loading ? <ItemCardSkeleton /> : <ItemCard {...item} />}
                ListHeaderComponent={<View style={styles.paddingTop} />}
            />
        </View>
    )
})

export default BestTab

const styles = StyleSheet.create({
    marginTop: {
        height: 48
    },
    paddingTop: {
        height: 24,
    },
    container: {
        width: WIDTH,
        flex: 1,
        // paddingTop: 24
    },
    columnWrapperStyle: {
        paddingLeft: 8,
    },
    headerContainer: {
        marginBottom: 24,
        width: WIDTH
    },
    headerTitle: {
        fontSize: 18
    }
})
