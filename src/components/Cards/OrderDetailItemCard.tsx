import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { COLOR1, COLOR2, GRAY } from '../../constants/styles'
import { PaymentDetailOrder } from '../../graphql/payment'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../Text/BaseText'
import BorderyButton from '../Buttons/BorderyButton'



const OrderDetailItemCard: React.FC<PaymentDetailOrder> = ({ item, totalPrice, state, stringOptionNum, id, itemReview }) => {

    const { navigate } = useNavigation()

    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigate('ItemDetail', { id: item.id })} >
                <Image
                    style={styles.image}
                    source={{ uri: item.mainImage }}
                />
            </Pressable>
            <View>
                <BaseText numberOfLines={1} >{item.name}</BaseText>
                <BaseText numberOfLines={1} style={styles.option} >{stringOptionNum}</BaseText>
                <View style={styles.priceContainer} >
                    <BaseText style={styles.price} >{moneyFormat(totalPrice)}원</BaseText>
                </View>
                {(state !== '구매접수' && state !== '취소처리') && <View style={styles.stateContainer} >
                    {state === '상점취소처리' && <BorderyButton onPress={() => navigate('OrderShopCancelDetail', { id })}>취소처리됨</BorderyButton>}
                    {state === '배송중' && <BorderyButton onPress={() => navigate('DeliveryDetail', { id })}>배송조회</BorderyButton>}
                    {state === '배송완료' && <>
                        {itemReview
                            ? <BorderyButton onPress={() => navigate('ReviewModify', { id: itemReview.id })}>리뷰수정</BorderyButton>
                            : <BorderyButton onPress={() => navigate('ReviewPost', { orderId: id })} >리뷰작성</BorderyButton>
                        }
                        <BorderyButton style={{ marginLeft: 16 }} onPress={() => navigate('Exchange', { id })} >교환하기</BorderyButton>
                        <BorderyButton style={{ marginLeft: 16 }} onPress={() => navigate('Refund', { id })}>환불하기</BorderyButton>
                    </>}
                    {state === '교환중' && <BorderyButton onPress={() => navigate('ExchangeDetail', { id })}>교환상세</BorderyButton>}
                    {state === '환불중' && <BorderyButton onPress={() => navigate('RefundDetail', { id })}>환불상세</BorderyButton>}
                    {state === '교환처리' && <BorderyButton onPress={() => navigate('ExchangeResult', { id })}>교환처리됨</BorderyButton>}
                    {state === '환불처리' && <BorderyButton onPress={() => navigate('RefundResult', { id })}>환불처리됨</BorderyButton>}
                    {state === '구매확정' && itemReview && <BorderyButton onPress={() => navigate('ReviewModify', { id: itemReview.id })}>리뷰수정</BorderyButton>}
                </View>}
            </View>
        </View >
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
        fontSize: 16,
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