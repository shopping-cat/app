import React, { useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import BaseText from '../../../components/Text/BaseText'
import ItemCard from '../../../components/Cards/ItemCard'
import { WIDTH } from '../../../constants/styles'
import { useFilteredItems } from '../../../graphql/item'
import useRefreshing from '../../../hooks/useRefreshing'

const NewTab = React.forwardRef<FlatList>((_, ref) => {

    const { data, refetch, fetchMore } = useFilteredItems({
        variables: {
            orderBy: '최신순'
        }
    })
    const { onRefresh, refreshing } = useRefreshing(refetch)

    return (
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
            style={styles.container}
            numColumns={2}
            data={data?.filteredItems}
            renderItem={({ item }) => <ItemCard {...item} />}
            ListHeaderComponent={
                <View style={styles.headerContainer} >
                    <BaseText style={styles.headerTitle} >새로운 상품들이 추가됐어요!</BaseText>
                </View>
            }
        />
    )
})

export default NewTab

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
