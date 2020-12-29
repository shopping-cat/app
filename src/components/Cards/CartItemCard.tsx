import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { ID } from '../../constants/types'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'
import Close14pxIcon from '../Svgs/Close14pxIcon'
import CloseIcon from '../Svgs/CloseIcon'
import CheckBoxToggle from '../Toggle/CheckBoxToggle'

interface CartItemCardProps {
    selected: boolean
    onDelete: (id: ID) => void
    onSelect: (id: ID) => void
}

const dummyId = 123
const shopId = 123
const dummyImage = 'https://image.hanssem.com/hsimg/gds/368/760/760474_A1.jpg'
const dummyShopNAme = '아이러브캣'
const dummyName = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const option = '해먹 | 베이지'
const isFreeDelivery = false
const price = 79000
const salePrice = 67000
const number = 1

const CartItemCard: React.FC<CartItemCardProps> = ({ onDelete, selected, onSelect }) => {

    const { navigate } = useNavigation()

    const onItem = useCallback(() => {
        navigate('ItemDetail', { id: dummyId })
    }, [dummyId])

    const onShop = useCallback(() => {
        navigate('ShopDetail', { id: shopId })
    }, [shopId])

    return (
        <View style={styles.container} >
            <View style={styles.rowContainer} >
                <CheckBoxToggle active={true} onPress={() => onSelect(dummyId)} />
                <Pressable onPress={onItem} >
                    <Image
                        style={styles.image}
                        source={{ uri: dummyImage }}
                    />
                </Pressable>
                <View style={styles.itemInfoContainer} >
                    <Pressable onPress={onShop} >
                        <BaseText style={styles.shopName} >{dummyShopNAme}</BaseText>
                    </Pressable>
                    <Pressable onPress={onShop} >
                        <BaseText numberOfLines={1} >{dummyName}</BaseText>
                    </Pressable>
                    <BaseText numberOfLines={1} style={styles.option} >{option}</BaseText>
                </View>
                <Pressable
                    style={styles.deleteIcon}
                    onPress={() => onDelete(dummyId)}
                >
                    <Close14pxIcon />
                </Pressable>
            </View>
            <View style={styles.bottomContainer} >
                <View style={styles.freeDeleveryContainer} >
                    <BaseText style={styles.freeDelivery} >무료배송</BaseText>
                </View>
                <View style={styles.priceContainer} >
                    {salePrice && <BaseText style={styles.price} >{moneyFormat(price)}원</BaseText>}
                    <BaseText style={styles.salePrice} >{salePrice ? moneyFormat(salePrice) : moneyFormat(price)}원</BaseText>
                    <BaseText style={styles.number} >{number}개</BaseText>
                </View>
            </View>
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
        alignItems: 'center'
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
        paddingLeft: 40,
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
        marginRight: 8
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