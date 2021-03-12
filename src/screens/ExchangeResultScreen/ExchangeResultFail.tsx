import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import { COLOR2 } from '../../constants/styles'

const failMessage = '재고가 없습니다'

const ExchangeResultFail = () => {
    return (
        <View  >
            <View style={styles.failCotnainer} >
                <BaseText style={styles.title} >교환을 실패했습니다</BaseText>
            </View>
            <View style={styles.messageContainer} >
                <BaseText style={styles.message} >{failMessage}</BaseText>
            </View>
        </View>
    )
}

export default ExchangeResultFail

const styles = StyleSheet.create({
    failCotnainer: {
        width: '100%',
        height: 160,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 20
    },
    message: {
        color: '#fff',
        lineHeight: 20
    },
    messageContainer: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: COLOR2
    }
})
