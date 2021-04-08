import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { WIDTH } from '../../constants/styles'
import { HomeItem, Item } from '../../graphql/item'
import BaseSkeletonPlaceHolder from '../Loading/BaseSkeletonPlaceHolder'
import BaseText from '../Text/BaseText'
import ItemCardASecondAndHalf, { ItemCardASecondAndHalfSkeleton } from './ItemCardASecondAndHalf'

const width = (WIDTH - 48) / 2.5

interface HomeItemCardProps {
    loading: boolean
    index: number
}

const HomeItemCard: React.FC<HomeItem & HomeItemCardProps> = ({ loading, items, title, type, index }) => {

    if (loading) return <HomeItemCardSkeleton />

    return (
        <View style={[styles.container, { marginTop: index === 0 ? 24 : 32 }]} >
            <BaseText style={styles.title} >{title}</BaseText>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.flatlist}
                overScrollMode='never'
                keyExtractor={(item) => item.id.toString()}
                data={items}
                renderItem={({ item }) => <ItemCardASecondAndHalf  {...item} />}
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
                <View style={{ width: '40%', height: 28, borderRadius: 8, marginLeft: 16, marginBottom: 24, marginTop: 24 }} />
                <View style={{ flexDirection: 'row' }} >
                    <View style={{ width, marginLeft: 16 }} >
                        <View style={{
                            width,
                            height: width,
                            borderRadius: 8,
                            marginBottom: 8
                        }} />
                        <View style={{ width, height: 32, borderRadius: 8 }} />
                    </View>
                    <View style={{ width, marginLeft: 16 }} >
                        <View style={{
                            width,
                            height: width,
                            borderRadius: 8,
                            marginBottom: 8
                        }} />
                        <View style={{ width, height: 32, borderRadius: 8 }} />
                    </View>
                    <View style={{ width, marginLeft: 16 }} >
                        <View style={{
                            width,
                            height: width,
                            borderRadius: 8,
                            marginBottom: 8
                        }} />
                        <View style={{ width, height: 32, borderRadius: 8 }} />
                    </View>

                </View>
            </BaseSkeletonPlaceHolder>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

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
