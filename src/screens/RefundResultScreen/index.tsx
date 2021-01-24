import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'
import RefundResultFail from './RefundResultFail'

const isFail = false

const dummyRefundReason = '상품 문제'
const dummyRefundReasonDetail = '이미지와 내용물이 다름'
const dummyPrice = 55300
const dummyRefundPrice = 51000
const dummyRefundWay = '결제취소'
const dummyRefundPoint = 1500

const dummyImage = 'https://image.hanssem.com/hsimg/gds/368/760/760474_A1.jpg'
const dummyName = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const option = '해먹 | 베이지'
const price = 79000
const number = 1


const RefundResultScreen = () => {
    return (
        <ScreenLayout>
            <DefaultHeader title='환불결과' disableBtns />
            {isFail && <RefundResultFail />}
            {!isFail &&
                <ScrollView style={styles.container} >

                    <View style={styles.infoContainer} >
                        <BaseText style={styles.title} >상품 정보</BaseText>
                        <View style={styles.itemContainer} >
                            <Image
                                source={{ uri: dummyImage }}
                                style={styles.itemImage}
                            />
                            <View>
                                <BaseText numberOfLines={1} >{dummyName}</BaseText>
                                <BaseText style={styles.itemOption} numberOfLines={1} >{option}</BaseText>
                                <View style={styles.itemPriceContainer} >
                                    <BaseText style={styles.itemPrice}  >{moneyFormat(price)}원</BaseText>
                                    <BaseText style={styles.itemNumber} >{number}개</BaseText>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.infoContainer} >
                        <BaseText style={styles.title} >환불 사유</BaseText>
                        <BaseText style={styles.content} >{dummyRefundReason}</BaseText>
                    </View>

                    <View style={styles.infoContainer} >
                        <BaseText style={styles.title} >상세 사유</BaseText>
                        <BaseText style={styles.content} >{dummyRefundReasonDetail}</BaseText>
                    </View>

                    <View style={styles.infoContainer} >
                        <BaseText style={styles.title} >환불 정보</BaseText>
                        <View style={[styles.labelContainer, { marginBottom: 0 }]} >
                            <BaseText style={styles.label} >상품 결제 금액</BaseText>
                            <BaseText  >{moneyFormat(dummyPrice)}원</BaseText>
                        </View>
                    </View>

                    <View style={[styles.labelContainer, { marginTop: 24 }]} >
                        <BaseText style={styles.label} >총 환불금액</BaseText>
                        <BaseText style={{ color: COLOR1 }} >{moneyFormat(dummyRefundPrice)}원</BaseText>
                    </View>
                    <View style={styles.labelContainer} >
                        <BaseText style={styles.label} >환불수단</BaseText>
                        <BaseText  >{dummyRefundWay}</BaseText>
                    </View>
                    <View style={styles.labelContainer} >
                        <BaseText style={styles.label} >환불 포인트</BaseText>
                        <BaseText  >{moneyFormat(dummyRefundPoint)}포인트</BaseText>
                    </View>

                </ScrollView>
            }
        </ScreenLayout>
    )
}

export default RefundResultScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    infoContainer: {
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    title: {
        fontSize: 18,
        marginBottom: 24
    },
    content: {
        flex: 1,
        paddingLeft: 8,
        color: GRAY,
        lineHeight: 20,
    },
    itemContainer: {
        width: '100%',
        paddingHorizontal: 8,
        flexDirection: 'row'
    },
    itemImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    itemOption: {
        color: GRAY,
        marginTop: 8,
        marginBottom: 8
    },
    itemPriceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    itemPrice: {
        fontSize: 16
    },
    itemNumber: {
        color: GRAY,
        marginLeft: 8
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8,
        marginBottom: 24
    },
    label: {
        color: GRAY,
    }
})
