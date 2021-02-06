import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseSkeletonPlaceHolder from '../../components/BaseSkeletonPlaceHolder'

const PaymentSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={{ paddingHorizontal: 16 }} >

                <View style={{ width: '40%', height: 24, borderRadius: 8, marginTop: 24 }} />
                <View style={{ width: '60%', height: 16, borderRadius: 6, marginTop: 16 }} />
                <View style={{ width: '30%', height: 16, borderRadius: 6, marginTop: 16 }} />
                <View style={{ width: '50%', height: 16, borderRadius: 6, marginTop: 16 }} />

                <View style={{ width: '45%', height: 24, borderRadius: 8, marginTop: 24 }} />
                <View style={{ width: '40%', height: 16, borderRadius: 6, marginTop: 16 }} />
                <View style={{ width: '50%', height: 16, borderRadius: 6, marginTop: 16 }} />
                <View style={{ width: '20%', height: 16, borderRadius: 6, marginTop: 16 }} />

                <View style={{ width: '55%', height: 24, borderRadius: 8, marginTop: 24 }} />
                <View style={{ width: '70%', height: 16, borderRadius: 6, marginTop: 16 }} />
                <View style={{ width: '50%', height: 16, borderRadius: 6, marginTop: 16 }} />
                <View style={{ width: '60%', height: 16, borderRadius: 6, marginTop: 16 }} />
            </View>
        </BaseSkeletonPlaceHolder>
    )
}

export default PaymentSkeleton

const styles = StyleSheet.create({})
