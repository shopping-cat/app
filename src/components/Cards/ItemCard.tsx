import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, COLOR2, WIDTH } from '../../constants/styles'
import BaseText from '../BaseText'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moneyFormat from '../../lib/moneyFormat'

const width = (WIDTH - 48) / 2

const dummyMainImage = 'https://image.ohou.se/i/bucketplace-v2-development/uploads/productions/1559092249079_6iaaLDj8u8.jpg?gif=1&w=480&h=480&c=c'
const isFreeDelivery = true
const isNew = true
const itemName = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const isILiked = true
const sale = 25
const salePrice = 75600

const ItemCard: React.FC<any> = () => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        navigate('ItemDetail', {})
    }, [])

    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <View>
                <Image
                    source={{ uri: dummyMainImage }}
                    style={styles.image}
                />
                {isILiked && <Icon style={styles.likedIcon} name='heart' size={24} color={COLOR1} />}
            </View>
            {(isNew || isFreeDelivery) &&
                <View style={styles.optionContainer} >
                    {isFreeDelivery &&
                        <View style={styles.freeDeliveryOptionContainer} >
                            <BaseText style={styles.optionText} >무료배송</BaseText>
                        </View>
                    }
                    {isNew &&
                        <View style={styles.newOptionContainer} >
                            <BaseText style={styles.optionText} >NEW</BaseText>
                        </View>
                    }
                </View>
            }
            <BaseText numberOfLines={2} style={styles.name} >{itemName}</BaseText>
            <View style={styles.priceContainer} >
                {sale && <BaseText style={styles.sale} >{sale}%</BaseText>}
                <BaseText style={styles.price} >{moneyFormat(salePrice)}</BaseText>
                <BaseText style={styles.priceUnit} >원</BaseText>
            </View>
        </Pressable>
    )
}

export default ItemCard

const styles = StyleSheet.create({
    container: {
        width,
        marginBottom: 24,
        marginHorizontal: 8
    },
    image: {
        width,
        height: width,
        borderRadius: 16,
        marginBottom: 8
    },
    likedIcon: {
        position: 'absolute',
        bottom: 8 + 12,
        right: 12
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between'
    },
    freeDeliveryOptionContainer: {
        width: (width - 8) / 2,
        height: 24,
        borderRadius: 8,
        backgroundColor: COLOR1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    newOptionContainer: {
        width: (width - 8) / 2,
        height: 24,
        borderRadius: 8,
        backgroundColor: COLOR2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionText: {
        color: '#fff'
    },
    name: {
        lineHeight: 20,
        marginBottom: 8
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    sale: {
        fontSize: 20,
        color: COLOR1,
        marginRight: 8
    },
    price: {
        fontSize: 20
    },
    priceUnit: {
        marginLeft: 1,
        marginBottom: 1
    }
})
