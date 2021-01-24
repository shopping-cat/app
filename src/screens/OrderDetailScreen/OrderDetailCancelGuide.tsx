import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import RightArrowIcon from '../../components/Svgs/RightArrowIcon'
import { VERY_LIGHT_GRAY } from '../../constants/styles'

const OrderDetailCancelGuide = () => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        navigate('OrderCancelGuide')
    }, [])

    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <BaseText style={styles.title} >주문취소/교환/환불 안내</BaseText>
            <RightArrowIcon fill='#000' />
        </Pressable>
    )
}

export default OrderDetailCancelGuide

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 18
    }
})
