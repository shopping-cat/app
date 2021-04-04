import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { WIDTH } from '../../constants/styles'
import { HomeItem, Item } from '../../graphql/item'
import BaseSkeletonPlaceHolder from '../Loading/BaseSkeletonPlaceHolder'
import BaseText from '../Text/BaseText'
import ItemCardASecondAndHalf, { ItemCardASecondAndHalfSkeleton } from './ItemCardASecondAndHalf'



const HomeItemCard: React.FC<HomeItem & { loading: boolean }> = ({ loading, items, title, type }) => {

    if (loading) return <HomeItemCardSkeleton />

    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >{title}</BaseText>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.flatlist}
                overScrollMode='never'
                keyExtractor={(item) => item.id.toString()}
                data={items}
                renderItem={({ item }) => <ItemCardASecondAndHalf {...item} />}
                ListFooterComponent={<View style={{ width: 16 }} />}
            />
        </View>
    )
}

export default HomeItemCard

const HomeItemCardSkeleton = () => {
    return (
        <View style={styles.container} >
            <BaseSkeletonPlaceHolder>
                <View style={{ width: '40%', height: 28, borderRadius: 8, marginLeft: 16, marginBottom: 24 }} />
            </BaseSkeletonPlaceHolder>
            <View style={{ flexDirection: 'row' }} >
                <ItemCardASecondAndHalfSkeleton />
                <ItemCardASecondAndHalfSkeleton />
                <ItemCardASecondAndHalfSkeleton />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24
    },
    title: {
        fontSize: 20,
        marginBottom: 24,
        marginLeft: 16
    },
    flatlist: {
        width: WIDTH
    }
})
