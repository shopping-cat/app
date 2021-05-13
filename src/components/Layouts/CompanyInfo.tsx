import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GRAY, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'
import BaseText from '../Text/BaseText'

const INFO = `대표자 남궁현 | 사업자등록번호 698-47-00632
대표자번호 050-7465-0492
사업장주소 경기도 용인시 기흥로 116번길 77 607동 1401호
통신판매업

쇼핑냥이는 통신판매중개자이며 통신판매의 당사자가 아닙니다. 따라서 쇼핑냥이는 상품/거래 정보 및 거래에 책임을 지지 않습니다`

const CompanyInfo = () => {
    return (
        <View style={styles.container} >
            <BaseText style={styles.name} >쇼핑냥이</BaseText>
            <BaseText selectable style={styles.info} >{INFO}</BaseText>
        </View>
    )
}

export default CompanyInfo

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
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