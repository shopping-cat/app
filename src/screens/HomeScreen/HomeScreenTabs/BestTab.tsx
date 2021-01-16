import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ItemCard from '../../../components/Cards/ItemCard'
import { WIDTH } from '../../../constants/styles'

const dummyItems = Array(20).fill({}).map((_, i) => ({ id: (i + 1).toString() }))

const BestTab = React.forwardRef<FlatList>((_, ref) => {
    return (
        <FlatList
            ref={ref}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.columnWrapperStyle}
            numColumns={2}
            style={styles.container}
            data={dummyItems}
            renderItem={() => <ItemCard />}
        />
    )
})

export default BestTab

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        flex: 1,
        paddingTop: 48 + 24
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
