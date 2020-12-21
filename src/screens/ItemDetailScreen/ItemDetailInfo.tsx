import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, Share, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR1, COLOR2, GRAY } from '../../constants/styles'
import BaseText from '../../components/BaseText'
import RateStars from '../../components/RateStars'
import moneyFormat from '../../lib/moneyFormat'

const id = 12424
const shopId = 21
const shopName = '아이러브켓'
const title = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const sale = 7
const isSale = true
const price = 49000
const sellingPrice = 38750
const rate = 4.73
const rateNum = 235

const ItemDetailInfo = () => {

    const { navigate } = useNavigation()

    const onShare = useCallback(() => {
        Share.share({ message: `shoppingcat://item/${id}` })
    }, [])

    const onShop = useCallback(() => {
        navigate('ShopDetail', { id: shopId })
    }, [])

    return (
        <View style={styles.container} >
            <Pressable
                onPress={onShare}
                style={styles.shareButton}
            >
                <Icon name='share-variant' color='#000' size={18} />
            </Pressable>
            <Pressable
                onPress={onShop}
                style={styles.shopInfoContainer}
            >
                <Icon name='storefront-outline' color={COLOR2} size={16} />
                <BaseText style={styles.shopName} >{shopName}</BaseText>
            </Pressable>

            <BaseText style={styles.title} >{title}</BaseText>

            <View style={styles.priceInfoContainer} >
                {isSale && <BaseText style={styles.sale}>{sale}%</BaseText>}
                <BaseText style={styles.sellingPrice} >{moneyFormat(sellingPrice)}</BaseText>
                <BaseText style={styles.sellingPriceUnit} >원</BaseText>
                {isSale && <BaseText style={styles.price} >{moneyFormat(price)}원</BaseText>}
            </View>

            {rateNum > 0 && <View style={styles.rateInfoContainer} >
                <RateStars
                    rate={rate}
                    spacing={3}
                    starSize={12}
                />
                <BaseText style={styles.rateNum} >({rateNum})</BaseText>
            </View>}
        </View>
    )
}

export default ItemDetailInfo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16,
        alignItems: 'flex-start'
    },
    shareButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        height: 56,
        width: 56,
        alignItems: 'flex-end'
    },
    shopInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    shopName: {
        marginLeft: 8,
        color: COLOR2
    },
    title: {
        fontSize: 16,
        marginBottom: 10
    },
    priceInfoContainer: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    rateInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    sale: {
        color: COLOR1,
        marginRight: 8
    },
    sellingPrice: {
        fontSize: 18,
        marginRight: 2
    },
    sellingPriceUnit: {
        fontSize: 10,
        marginRight: 8,
        marginTop: 4
    },
    price: {
        fontSize: 10,
        color: GRAY,
        marginTop: 4,
        textDecorationLine: 'line-through'
    },
    rateNum: {
        fontSize: 12,
        color: GRAY,
        marginLeft: 4
    }
})
