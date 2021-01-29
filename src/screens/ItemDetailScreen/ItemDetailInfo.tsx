import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, Share, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR1, COLOR2, GRAY } from '../../constants/styles'
import BaseText from '../../components/BaseText'
import RateStars from '../../components/RateStars'
import moneyFormat from '../../lib/moneyFormat'
import { ItemDetail } from '../../graphql/item'


const ItemDetailInfo: React.FC<ItemDetail> = ({ id, partner, name, sale, salePrice, price, rate, reviewNum }) => {

    const { navigate } = useNavigation()

    const onShare = useCallback(() => {
        // TODO
        Share.share({ message: `shoppingcat://item/${id}` })
    }, [])

    const onShop = useCallback(() => {
        navigate('ShopDetail', { id: partner.id })
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
                <BaseText style={styles.shopName} >{partner.shopName}</BaseText>
            </Pressable>

            <BaseText style={styles.title} >{name}</BaseText>

            <View style={styles.priceInfoContainer} >
                {sale !== 0 && <BaseText style={styles.sale}>{sale}%</BaseText>}
                <BaseText style={styles.sellingPrice} >{moneyFormat(salePrice)}</BaseText>
                <BaseText style={styles.sellingPriceUnit} >원</BaseText>
                {sale !== 0 && <BaseText style={styles.price} >{moneyFormat(price)}원</BaseText>}
            </View>

            <View style={styles.rateInfoContainer} >
                <RateStars
                    rate={rate}
                    spacing={3}
                    starSize={12}
                />
                <BaseText style={styles.rateNum} >({moneyFormat(reviewNum)})</BaseText>
            </View>
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
