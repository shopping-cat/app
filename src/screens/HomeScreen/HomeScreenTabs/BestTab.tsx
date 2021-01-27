import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import ItemCard from '../../../components/Cards/ItemCard'
import { WIDTH } from '../../../constants/styles'
import { Category } from '../../../constants/types'
import { useFilteredItems } from '../../../graphql/item'

interface BsetTabProps {
    category1: Category
    category2: Category
}

const BestTab = React.forwardRef<FlatList, BsetTabProps>(({ category1, category2 }, ref) => {

    const { data, refetch, fetchMore, loading } = useFilteredItems({
        variables: {
            orderBy: '인기순',
            category: category2 || category1 || '전체',
        }
    })


    return (
        <View style={{ flex: 1 }} >
            <View style={styles.marginTop} />
            <FlatList
                ref={ref}
                refreshing={!!data && loading}
                onRefresh={refetch}
                onEndReached={() => fetchMore({
                    variables: { offset: data?.filteredItems.length }
                })}
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={styles.columnWrapperStyle}
                numColumns={2}
                onEndReachedThreshold={0.4}
                style={styles.container}
                data={data?.filteredItems}
                renderItem={({ item }) => <ItemCard {...item} />}
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
