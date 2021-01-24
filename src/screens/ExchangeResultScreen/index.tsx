import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'
import ExchangeResultFail from './ExchangeResultFail'

const isFail = false

const dummyExchangeReason = '상품 문제'
const dummyExchangeReasonDetail = '이미지와 내용물이 다름'

const dummyImage = 'https://image.hanssem.com/hsimg/gds/368/760/760474_A1.jpg'
const dummyName = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const option = '해먹 | 베이지'
const price = 79000
const number = 1


const ExchangeResultScreen = () => {
    return (
        <ScreenLayout>
            <DefaultHeader title='교환결과' disableBtns />
            {isFail && <ExchangeResultFail />}
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
                        <BaseText style={styles.title} >교환 사유</BaseText>
                        <BaseText style={styles.content} >{dummyExchangeReason}</BaseText>
                    </View>

                    <View style={styles.infoContainer} >
                        <BaseText style={styles.title} >상세 사유</BaseText>
                        <BaseText style={styles.content} >{dummyExchangeReasonDetail}</BaseText>
                    </View>

                </ScrollView>
            }
        </ScreenLayout>
    )
}

export default ExchangeResultScreen

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
