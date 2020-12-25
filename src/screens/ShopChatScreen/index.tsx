import { Route, useRoute } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { ID } from '../../constants/types'

interface ShopChatScreenProps {
    name?: string
    itemId?: ID
}

const ShopChatScreen = () => {

    const { params } = useRoute<Route<string, ShopChatScreenProps | undefined>>()


    return (
        <ScreenLayout>
            <DefaultHeader title={params?.name || '채팅'} />
        </ScreenLayout>
    )
}

export default ShopChatScreen

const styles = StyleSheet.create({})
