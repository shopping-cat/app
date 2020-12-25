import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR1, COLOR2, WIDTH } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'

const dummyMainImage = 'https://undark.org/wp-content/uploads/2020/02/GettyImages-1199242002-1-scaled.jpg'
const isFreeDelivery = true
const isNew = true
const itemName = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const isILiked = true
const sale = 25
const salePrice = 75600

const width = (WIDTH - 64) / 3

const ItemCardAThird: React.FC<any> = () => {

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
                {isILiked && <Icon style={styles.likedIcon} name='heart' size={16} color={COLOR1} />}
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
                <BaseText >{moneyFormat(salePrice)}</BaseText>
                <BaseText style={styles.priceUnit} >원</BaseText>
            </View>
        </Pressable>
    )
}

export default ItemCardAThird

const styles = StyleSheet.create({
    container: {
        width,
        marginBottom: 24,
        marginHorizontal: 8
    },
    image: {
        width,
        height: width,
        borderRadius: 8,
        marginBottom: 8
    },
    likedIcon: {
        position: 'absolute',
        bottom: 8 + 4,
        right: 4
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        justifyContent: 'space-between'
    },
    freeDeliveryOptionContainer: {
        width: (width - 8) / 2,
        height: 16,
        borderRadius: 4,
        backgroundColor: COLOR1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    newOptionContainer: {
        width: (width - 8) / 2,
        height: 16,
        borderRadius: 4,
        backgroundColor: COLOR2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    optionText: {
        fontSize: 12,
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
    priceUnit: {
        fontSize: 10,
        marginLeft: 1,
        marginBottom: 1
    }
})
