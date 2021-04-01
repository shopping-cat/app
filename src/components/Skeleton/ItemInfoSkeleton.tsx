import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseSkeletonPlaceHolder from '../Loading/BaseSkeletonPlaceHolder'

const ItemInfoSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={styles.container} >
                <View style={styles.image} />
                <View style={styles.infoContainer} >
                    <View style={{ borderRadius: 4, width: '50%', height: 16 }} />
                    <View style={{ borderRadius: 4, width: '70%', height: 16 }} />
                    <View style={{ borderRadius: 4, width: '40%', height: 16 }} />
                </View>
            </View>
        </BaseSkeletonPlaceHolder>
    )
}

export default ItemInfoSkeleton

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 24,
        paddingTop: 24,
        flexDirection: 'row'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    infoContainer: {
        justifyContent: 'space-between',
        flex: 1
    }
})