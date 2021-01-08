import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'

const CategoryScreen = () => {
    return (
        <ScreenLayout>
            <DefaultHeader disableGoBack title='카테고리' />
        </ScreenLayout>
    )
}

export default CategoryScreen

const styles = StyleSheet.create({})
