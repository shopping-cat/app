import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../../components/BaseText'
import ItemCard from '../../../components/Cards/ItemCard'
import { WIDTH } from '../../../constants/styles'

const dummyItems = Array(20).fill({}).map((_, i) => ({ id: (i + 1).toString() }))

const HomeTab = () => {
    return (
        <FlatList
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            style={styles.container}
            numColumns={2}
            data={dummyItems}
            renderItem={() => <ItemCard />}
            ListHeaderComponent={
                <View style={styles.headerContainer} >
                    <BaseText style={styles.headerTitle} >추천 상품</BaseText>
                </View>
            }
        />

    )
}

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
