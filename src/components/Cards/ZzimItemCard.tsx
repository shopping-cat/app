import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, COLOR2, LIGHT_GRAY, WIDTH } from '../../constants/styles'
import { ID } from '../../constants/types'
import { Item } from '../../graphql/item'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'
import CheckIcon from '../Svgs/CheckIcon'


const width = (WIDTH - 64) / 3

interface ZzimItemCardProps {
    onSelect: (id: ID) => void
    onSelectMode: (id: ID) => void // select mode로 전환
    isSelectMode: boolean
    isSelected: boolean
    id: ID
}

const ZzimItemCard: React.FC<ZzimItemCardProps & Item> = ({ isSelectMode, onSelectMode, onSelect, id, isSelected, mainImage, isNew, isFreeDelivery, sale, salePrice, isILiked, name, state }) => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        if (isSelectMode) onSelect(id)
        else navigate('ItemDetail', { id })
    }, [id, isSelectMode, onSelect])

    const onLongPress = useCallback(() => {
        if (isSelectMode) return
        onSelectMode(id)
    }, [isSelectMode, id, onSelectMode])

    return (
        <Pressable
            onLongPress={onLongPress}
            onPress={onPress}
            style={styles.container}
        >
            <View>
                <Image
                    source={{ uri: mainImage }}
                    style={styles.image}
                />
                {state !== 'sale' && <View style={styles.itemStateCotnainer} >
                    <BaseText style={styles.itemState} >{state === 'noStock' ? '재고없음' : '판매중지'}</BaseText>
                </View>}
                {isSelectMode &&
                    <View style={[styles.selectModeView, { backgroundColor: isSelected ? COLOR1 + '88' : undefined }]} >
                        <View style={[styles.selectModeToggle, { backgroundColor: isSelected ? COLOR1 : LIGHT_GRAY }]} >
                            <CheckIcon fill='#fff' />
                        </View>
                    </View>
                }
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
                <BaseText>{moneyFormat(salePrice)}</BaseText>
                <BaseText style={styles.priceUnit} >원</BaseText>
            </View>
        </Pressable>
    )
}

export default ZzimItemCard

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
    },
    selectModeView: {
        width,
        height: width,
        borderRadius: 8,
        position: 'absolute',
    },
    selectModeToggle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
        position: 'absolute',
        right: 6,
        bottom: 6,
        alignItems: 'center',
        justifyContent: 'center'
    },
})
