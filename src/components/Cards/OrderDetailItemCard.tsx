import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { OrderState } from '../../constants/types'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'
import BorderyButton from '../Buttons/BorderyButton'

const dummyImage = 'https://image.hanssem.com/hsimg/gds/368/760/760474_A1.jpg'
const dummyName = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const option = '해먹 | 베이지'
const price = 79000
const number = 1
let state: OrderState = '배송중'

const OrderDetailItemCard = () => {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container} >
            <Image
                style={styles.image}
                source={{ uri: dummyImage }}
            />
            <View>
                <BaseText numberOfLines={1} >{dummyName}</BaseText>
                <BaseText numberOfLines={1} style={styles.option} >{option}</BaseText>
                <View style={styles.priceContainer} >
                    <BaseText style={styles.price} >{moneyFormat(price)}원</BaseText>
                    <BaseText style={styles.number} >{number}개</BaseText>
                </View>
                <View style={styles.stateContainer} >
                    {state === '상점취소처리' && <BorderyButton onPress={() => navigate('OrderShopCancelDetail')}>취소처리됨</BorderyButton>}
                    {state === '배송완료' && <>
                        <BorderyButton onPress={() => navigate('Refund')} >교환하기</BorderyButton>
                        <BorderyButton style={{ marginLeft: 16 }} onPress={() => navigate('Exchange')}>환불하기</BorderyButton>
                    </>}
                    {state === '환불중' && <BorderyButton onPress={() => navigate('RefundDetail')}>환불상세</BorderyButton>}
                    {state === '교환중' && <BorderyButton onPress={() => navigate('ExchangeDetail')}>교환상세</BorderyButton>}
                    {state === '환불처리' && <BorderyButton onPress={() => navigate('RefundDetail')}>환불처리됨</BorderyButton>}
                    {state === '교환처리' && <BorderyButton onPress={() => navigate('ExchangeDetail')}>교환처리됨</BorderyButton>}
                </View>
            </View>
        </View>
    )
}

export default OrderDetailItemCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    shopName: {
        color: COLOR2
    },
    option: {
        color: GRAY,
        marginTop: 8,
        marginBottom: 8
    },
    deleteIcon: {
        alignSelf: 'flex-start'
    },
    bottomContainer: {
        flexDirection: 'row',
        marginTop: 8
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    price: {
        fontSize: 18,
        marginRight: 8
    },
    number: {
        color: GRAY
    },
    stateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16
    },
    state: { color: COLOR1 },
})