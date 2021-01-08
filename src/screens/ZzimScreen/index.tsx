import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'

const ZzimScreen = () => {
    return (
        <ScreenLayout>
            <DefaultHeader disableGoBack title='찜한 상품' />
        </ScreenLayout>
    )
}

export default ZzimScreen

const styles = StyleSheet.create({})
