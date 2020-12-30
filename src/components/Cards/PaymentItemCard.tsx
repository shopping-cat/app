import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'

const dummyImage = 'https://image.hanssem.com/hsimg/gds/368/760/760474_A1.jpg'
const dummyShopNAme = '아이러브캣'
const dummyName = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const option = '해먹 | 베이지'
const isFreeDelivery = false
const price = 79000
const salePrice = 67000
const number = 1

const PaymentItemCard = () => {
    return (
        <View style={styles.container} >
            <View style={styles.rowContainer} >
                <Image
                    style={styles.image}
                    source={{ uri: dummyImage }}
                />
                <View style={styles.itemInfoContainer} >
                    <BaseText style={styles.shopName} >{dummyShopNAme}</BaseText>
                    <BaseText numberOfLines={1} >{dummyName}</BaseText>
                    <BaseText numberOfLines={1} style={styles.option} >{option}</BaseText>
                </View>
            </View>
            <View style={styles.bottomContainer} >
                {isFreeDelivery && <View style={styles.freeDeleveryContainer} >
                    <BaseText style={styles.freeDelivery} >무료배송</BaseText>
                </View>}
                <View style={[styles.priceContainer, { marginLeft: isFreeDelivery ? 0 : 64 }]} >
                    {salePrice && <BaseText style={styles.price} >{moneyFormat(price)}원</BaseText>}
                    <BaseText style={styles.salePrice} >{salePrice ? moneyFormat(salePrice) : moneyFormat(price)}원</BaseText>
                    <BaseText style={styles.number} >{number}개</BaseText>
                </View>
            </View>
        </View>
    )
}

export default PaymentItemCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 32,
        paddingVertical: 24,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    itemInfoContainer: {
        justifyContent: 'space-between',
        height: 64,
        flex: 1
    },
    shopName: {
        color: COLOR2
    },
    option: {
        color: GRAY
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
        paddingLeft: 16
    },
    freeDeleveryContainer: {
        backgroundColor: COLOR1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: 64,
        height: 20
    },
    price: {
        fontSize: 16,
        color: GRAY,
        marginRight: 8,
        textDecorationLine: 'line-through'
    },
    salePrice: {
        fontSize: 18,
        marginRight: 8
    },
    number: {
        color: GRAY
    },
    freeDelivery: {
        color: '#fff'
    }
})