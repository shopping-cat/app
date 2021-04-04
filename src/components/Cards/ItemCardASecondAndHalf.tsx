import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR1, COLOR2, WIDTH } from '../../constants/styles'
import { Item } from '../../graphql/item'
import moneyFormat from '../../lib/moneyFormat'
import BaseSkeletonPlaceHolder from '../Loading/BaseSkeletonPlaceHolder'
import BaseText from '../Text/BaseText'

const width = (WIDTH - 48) / 2.5

const ItemCardASecondAndHalf: React.FC<Item> = ({ id, isFreeDelivery, isILiked, isNew, mainImage, name, sale, salePrice, state }) => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        navigate('ItemDetail', { id })
    }, [id])

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
                {isILiked && <Icon style={styles.likedIcon} name='heart' size={20} color={COLOR1} />}
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

export default ItemCardASecondAndHalf

export const ItemCardASecondAndHalfSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={styles.container} >
                <View style={styles.image} />
                <View style={{ width, height: 32, borderRadius: 8 }} />
            </View>
        </BaseSkeletonPlaceHolder>
    )
}

const styles = StyleSheet.create({
    container: {
        width,
        marginLeft: 16
    },
    image: {
        width,
        height: width,
        borderRadius: 8,
        marginBottom: 8
    },
    itemStateCotnainer: {
        position: 'absolute',
        width,
        height: width,
        borderRadius: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    itemState: {
        color: '#fff',
    },
    likedIcon: {
        position: 'absolute',
        bottom: 8 + 8,
        right: 8
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between'
    },
    freeDeliveryOptionContainer: {
        width: (width - 8) / 2,
        height: 20,
        borderRadius: 6,
        backgroundColor: COLOR1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    newOptionContainer: {
        width: (width - 8) / 2,
        height: 20,
        borderRadius: 6,
        backgroundColor: COLOR2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionText: {
        fontSize: 14,
        color: '#fff'
    },
    name: {
        lineHeight: 18,
        marginBottom: 8
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    sale: {
        fontSize: 16,
        color: COLOR1,
        marginRight: 4
    },
    price: {
        fontSize: 16
    },
    priceUnit: {
        fontSize: 12,
        marginLeft: 1,
        marginBottom: 1
    }
})
