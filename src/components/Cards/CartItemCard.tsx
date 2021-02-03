import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { ID } from '../../constants/types'
import { CartItem } from '../../graphql/cartItem'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'
import Close14pxIcon from '../Svgs/Close14pxIcon'
import CheckBoxToggle from '../Toggle/CheckBoxToggle'

interface CartItemCardProps {
    selected: boolean
    onDelete: (id: ID) => void
    onSelect: (id: ID) => void
    data: CartItem
}

const CartItemCard: React.FC<CartItemCardProps> = ({ onDelete, selected, onSelect, data }) => {

    const { navigate } = useNavigation()

    const onItem = useCallback(() => {
        navigate('ItemDetail', { id: data.itemId })
    }, [data])

    const onShop = useCallback(() => {
        navigate('ShopDetail', { id: data.item.partner.id })
    }, [data])

    return (
        <View style={styles.container} >
            <View style={styles.rowContainer} >
                <View style={styles.checkBoxContainer} >
                    <CheckBoxToggle active={true} onPress={() => onSelect(data.id)} />
                </View>
                <View>
                    <Pressable onPress={onItem} >
                        <Image
                            style={styles.image}
                            source={{ uri: data.item.mainImage }}
                        />
                    </Pressable>
                    {data.item.isFreeDelivery && <View style={styles.freeDeleveryContainer} >
                        <BaseText style={styles.freeDelivery} >무료배송</BaseText>
                    </View>}
                </View>

                <View>
                    <Pressable onPress={onShop} >
                        <BaseText style={styles.shopName} >{data.item.partner.shopName}</BaseText>
                    </Pressable>
                    <Pressable onPress={onShop} >
                        <BaseText numberOfLines={1} >{data.item.name}</BaseText>
                    </Pressable>
                    {data.stringOption && <BaseText numberOfLines={1} style={styles.option} >{data.stringOption}</BaseText>}
                    <View style={styles.priceContainer} >
                        {data.item.salePrice && <BaseText style={styles.price} >{moneyFormat(data.item.price * data.num)}원</BaseText>}
                        <BaseText style={styles.salePrice} >{data.item.salePrice ? moneyFormat(data.item.salePrice * data.num) : moneyFormat(data.item.price * data.num)}원</BaseText>
                        <BaseText style={styles.number} >{data.num}개</BaseText>
                    </View>
                </View>

            </View>

            <Pressable
                style={styles.deleteIcon}
                onPress={() => onDelete(data.id)}
            >
                <Close14pxIcon />
            </Pressable>
        </View>
    )
}

export default CartItemCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1
    },
    rowContainer: {
        flexDirection: 'row',
    },
    checkBoxContainer: {
        height: 64,
        justifyContent: 'center'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginHorizontal: 16
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
        position: 'absolute',
        right: 16,
        top: 24
    },
    bottomContainer: {
        flexDirection: 'row',
        paddingLeft: 40,
        marginTop: 8
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12
    },
    freeDeleveryContainer: {
        backgroundColor: COLOR1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: 64,
        height: 20,
        marginLeft: 16,
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