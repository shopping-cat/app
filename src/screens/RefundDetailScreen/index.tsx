import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'

const dummyHowToRefund = '서울시 강남구 송파 타워 1층 53호로 주문번호 (153520)와 휴대폰 번호를 동봉해서 보내주시면 됩니다. 금액은 반품이 확인된 이후에 진행 됩니다.'
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

const RefundDetailScreen = () => {

    const { goBack } = useNavigation()

    return (
        <ScreenLayout>
            <DefaultHeader title='환불상세' disableBtns />
            <ScrollView
                style={styles.container}
                overScrollMode='never'
            >
                <View style={styles.infoContainer} >
                    <BaseText style={styles.title} >환불/반품 방법</BaseText>
                    <BaseText style={styles.content} >{dummyHowToRefund}</BaseText>
                </View>

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
                    <BaseText style={styles.label} >예상 환불금액</BaseText>
                    <BaseText style={{ color: COLOR1 }} >{moneyFormat(dummyRefundPrice)}원</BaseText>
                </View>
                <View style={styles.labelContainer} >
                    <BaseText style={styles.label} >예상 환불수단</BaseText>
                    <BaseText  >{dummyRefundWay}</BaseText>
                </View>
                <View style={styles.labelContainer} >
                    <BaseText style={styles.label} >예상 환불 포인트</BaseText>
                    <BaseText  >{moneyFormat(dummyRefundPoint)}포인트</BaseText>
                </View>

            </ScrollView>
            <ButtonFooter
                active
                text='돌아가기'
                onPress={goBack}
            />
        </ScreenLayout>
    )
}

export default RefundDetailScreen

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