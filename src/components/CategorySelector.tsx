import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { VERY_LIGHT_GRAY } from '../constants/styles'

const dummyCategory = ['사료', '주식캔', '간식캔', '츄르', '모래', '캣타워', '낚시대', '사료', '주식캔', '간식캔', '츄르', '모래', '캣타워', '낚시대']

const CategorySelector = () => {
    return (
        <View style={styles.container} >

        </View>
    )
}

export default CategorySelector

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1
    }
})