import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { OrderItem } from '../../graphql/order'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../Text/BaseText'


const PaymentItemCard: React.FC<OrderItem> = ({ item, num, stringOption, optionedPrice, optionedSaledPrice }) => {
    return (
        <View style={styles.container} >
            <View style={styles.rowContainer} >
                <View>
                    <Image
                        style={styles.image}
                        source={{ uri: item.mainImage }}
                    />
                    {item.isFreeDelivery && <View style={styles.freeDeleveryContainer} >
                        <BaseText style={styles.freeDelivery} >무료배송</BaseText>
                    </View>}
                </View>
                <View >
                    <BaseText style={styles.shopName} >{item.partner.shopName}</BaseText>
                    <BaseText numberOfLines={1} >{item.name}</BaseText>
                    {stringOption && <BaseText numberOfLines={1} style={styles.option} >{stringOption}</BaseText>}
                    <View style={styles.priceContainer} >
                        {optionedSaledPrice !== optionedPrice && <BaseText style={styles.price} >{moneyFormat(optionedPrice * num)}원</BaseText>}
                        <BaseText style={styles.salePrice} >{moneyFormat(optionedSaledPrice * num)}원</BaseText>
                        <BaseText style={styles.number} >{num}개</BaseText>
                    </View>
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
        color: COLOR2,
        marginBottom: 8
    },
    option: {
        color: GRAY,
        marginTop: 8
    },
    deleteIcon: {
        alignSelf: 'flex-start'
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8
    },
    freeDeleveryContainer: {
        backgroundColor: COLOR1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        width: 64,
        height: 20,
        marginTop: 8
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