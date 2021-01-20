import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GRAY, VERY_LIGHT_GRAY } from '../constants/styles'
import BaseText from './BaseText'

const INFO = `대표이사 남궁현 | 사업자등록번호 000-0000-000
통신판매중개업 서울 송파-1243
경기도 용인시 기흥구 신갈동 신갈빌딩 12동 12호
고객센터 | 02-000-000

쇼핑냥이는 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서 쇼핑냥이는 상품/거래 정보 및 거래에 책임을 지지 않습니다`

const CompanyInfo = () => {
    return (
        <View style={styles.container} >
            <BaseText style={styles.name} >(주)쇼핑냥이</BaseText>
            <BaseText selectable style={styles.info} >{INFO}</BaseText>
        </View>
    )
}

export default CompanyInfo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: 24,
        paddingHorizontal: 16,
        backgroundColor: VERY_LIGHT_GRAY
    },
    name: {
        color: GRAY,
        marginBottom: 16
    },
    info: {
        fontSize: 12,
        color: GRAY,
        lineHeight: 16
    }
})