import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GRAY, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'
import { IS_CAT } from '../../constants/values'
import BaseText from '../Text/BaseText'

const INFO = `대표자 홍성욱 | 사업자등록번호 286-86-01500
대표자번호 010-6613-0703
사업장주소 서울특별시 강남구 테헤란로44길 8, 6층 57-2호
통신판매업

본 어플에서 거래된 결제건에 대한 민원, 교환, 환불 책임은 '${IS_CAT ? '쇼핑냥이' : '쇼핑댕이'}'에게 있습니다`

const CompanyInfo = () => {
    return (
        <View style={styles.container} >
            <BaseText style={styles.name} >딥스펀지 주식회사</BaseText>
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