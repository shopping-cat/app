import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'

const MyPageScreen = () => {
    return (
        <ScreenLayout>
            <DefaultHeader disableGoBack title='마이페이지' />
        </ScreenLayout>
    )
}

export default MyPageScreen

const styles = StyleSheet.create({})
