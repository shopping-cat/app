import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import BaseSkeletonPlaceHolder from '../../components/Loading/BaseSkeletonPlaceHolder'
import { WIDTH } from '../../constants/styles'

const ItemDetailPlaceHolder = () => {

    const { bottom } = useSafeAreaInsets()

    return (
        <>
            <BaseSkeletonPlaceHolder >
                <View style={styles.image} />
                <View style={{ height: 32, width: '30%', borderRadius: 8, marginLeft: 16, marginTop: 24 }} />
                <View style={{ height: 32, width: '70%', borderRadius: 8, marginLeft: 16, marginTop: 16 }} />
                <View style={{ height: 32, width: '50%', borderRadius: 8, marginLeft: 16, marginTop: 16 }} />
            </BaseSkeletonPlaceHolder>
            <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} >
                <BaseSkeletonPlaceHolder >
                    <View style={{ width: '100%', height: 80 + bottom }} />
                </BaseSkeletonPlaceHolder>
            </View>
        </>
    )
}

export default ItemDetailPlaceHolder

const styles = StyleSheet.create({
    image: {
        width: WIDTH,
        height: WIDTH
    }
})
