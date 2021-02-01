import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseSkeletonPlaceHolder from '../../components/BaseSkeletonPlaceHolder'
import { GRAY } from '../../constants/styles'

const ShopDetailSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={styles.shopInfoContianer} >
                <View style={styles.shopInfoContainerLeft} >
                    <View style={styles.image} />
                    <View >
                        <View style={{ width: 100, height: 24, borderRadius: 8 }} />
                        <View style={{ width: 160, height: 24, borderRadius: 8, marginTop: 16 }} />
                    </View>
                </View>
            </View>
            <View style={{ width: '100%', height: 8, marginBottom: 56 }} />
        </BaseSkeletonPlaceHolder>
    )
}

export default ShopDetailSkeleton

const styles = StyleSheet.create({
    shopInfoContianer: {
        width: '100%',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        height: 96,
        justifyContent: 'space-between'
    },
    shopInfoContainerLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16
    },
    shopName: {
        fontSize: 20,
        marginBottom: 8
    },
    rateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rate: {
        color: GRAY,
        marginLeft: 4
    },
    flatlistColumnWrapper: {
        paddingLeft: 8
    },
    sortBtnContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },
    sortText: {
        color: GRAY,
        marginRight: 8
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})
