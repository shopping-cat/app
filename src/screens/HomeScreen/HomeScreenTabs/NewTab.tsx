import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../../components/BaseText'
import ItemCard from '../../../components/Cards/ItemCard'
import { WIDTH } from '../../../constants/styles'

const dummyItems = Array(20).fill({}).map((_, i) => ({ id: (i + 1).toString() }))

const NewTab = React.forwardRef<FlatList>((_, ref) => {
    return (
        <FlatList
            ref={ref}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            style={styles.container}
            numColumns={2}
            data={dummyItems}
            renderItem={() => <ItemCard />}
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
