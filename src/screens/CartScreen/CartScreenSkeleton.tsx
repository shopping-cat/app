import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseSkeletonPlaceHolder from '../../components/BaseSkeletonPlaceHolder'

const CartScreenSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={styles.itemContainer} >
                <View style={styles.image} />
                <View style={styles.lineContainer} >
                    <View style={styles.line1} />
                    <View style={styles.line2} />
                    <View style={styles.line3} />
                </View>
            </View>
            <View style={styles.itemContainer} >
                <View style={styles.image} />
                <View style={styles.lineContainer} >
                    <View style={styles.line1} />
                    <View style={styles.line2} />
                    <View style={styles.line3} />
                </View>
            </View>
            <View style={styles.itemContainer} >
                <View style={styles.image} />
                <View style={styles.lineContainer} >
                    <View style={styles.line1} />
                    <View style={styles.line2} />
                    <View style={styles.line3} />
                </View>
            </View>
            <View style={styles.itemContainer} >
                <View style={styles.image} />
                <View style={styles.lineContainer} >
                    <View style={styles.line1} />
                    <View style={styles.line2} />
                    <View style={styles.line3} />
                </View>
            </View>
        </BaseSkeletonPlaceHolder>
    )
}

export default CartScreenSkeleton

const styles = StyleSheet.create({
    itemContainer: { flexDirection: 'row', paddingHorizontal: 16, paddingVertical: 24 },
    image: {
        width: 64,
        height: 64,
        marginHorizontal: 16,
        borderRadius: 8
    },
    lineContainer: {
        flex: 1
    },
    line1: {
        width: '40%',
        height: 16,
        borderRadius: 8
    },
    line2: {
        width: '70%',
        height: 16,
        borderRadius: 8,
        marginVertical: 8
    },
    line3: {
        width: '60%',
        height: 16,
        borderRadius: 8
    }
})
