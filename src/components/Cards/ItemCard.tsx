import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { COLOR1, COLOR2, VERY_LIGHT_GRAY, VERY_VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'
import BaseText from '../Text/BaseText'
import moneyFormat from '../../lib/moneyFormat'
import { Item } from '../../graphql/item'
import BaseSkeletonPlaceHolder from '../Loading/BaseSkeletonPlaceHolder';

const width = (WIDTH - 48) / 2


const ItemCard: React.FC<Item> = ({ id, isFreeDelivery, isILiked, isNew, mainImage, name, sale, salePrice, state }) => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        navigate('ItemDetail', { id })
    }, [])

    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <View>
                <Image
                    source={{ uri: mainImage }}
                    style={styles.image}
                />
                {isILiked && <Icon style={styles.likedIcon} name='heart' size={24} color={COLOR1} />}
                {state !== '판매중' && <View style={styles.itemStateCotnainer} >
                    <BaseText style={styles.itemState} >{state}</BaseText>
                </View>}
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
            <BaseText numberOfLines={2} style={styles.name} >{name}</BaseText>
            <View style={styles.priceContainer} >
                {sale !== 0 && <BaseText style={styles.sale} >{sale}%</BaseText>}
                <BaseText style={styles.price} >{moneyFormat(salePrice)}</BaseText>
                <BaseText style={styles.priceUnit} >원</BaseText>
            </View>
        </Pressable>
    )
}

export default ItemCard

export const ItemCardSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={styles.container} >
                <View style={styles.image} />
                <View style={{ width, height: 32, marginTop: 8, borderRadius: 8 }} />
            </View>
        </BaseSkeletonPlaceHolder>
    )
}

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
    itemStateCotnainer: {
        position: 'absolute',
        width,
        height: width,
        borderRadius: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemState: {
        color: '#fff',
        fontSize: 18
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
