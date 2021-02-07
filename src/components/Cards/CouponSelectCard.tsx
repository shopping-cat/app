import React, { useCallback } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { ID } from '../../constants/types'
import { OrderItem } from '../../graphql/order'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'
import BorderyButton from '../Buttons/BorderyButton'

interface CouponSelectCardProps {
    onCouponSelect: (id: ID) => void
    data: OrderItem
    selected: boolean
}

const CouponSelectCard: React.FC<CouponSelectCardProps> = ({ onCouponSelect, data, selected }) => {


    const onPress = useCallback(() => {
        onCouponSelect(data.id)
    }, [data, onCouponSelect])

    return (
        <View style={styles.container} >
            <Image
                style={styles.image}
                source={{ uri: data.item.mainImage }}
            />
            <View style={styles.column} >
                <BaseText  >{data.item.name}</BaseText>
                {data.stringOption && <BaseText style={styles.itemOption} >{data.stringOption}</BaseText>}
                <BaseText style={styles.itemPrice} >{moneyFormat(data.optionedSaledPrice)}원</BaseText>
                <View style={styles.line} />
                {selected && <BaseText style={styles.salePrice} >{moneyFormat(-3900)}원</BaseText>}
                <BorderyButton
                    active={true}
                    onPress={onPress}
                    style={styles.btn}
                >
                    {selected ? '취소' : '쿠폰사용'}
                </BorderyButton>
            </View>
        </View>
    )
}

export default CouponSelectCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexDirection: 'row'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    column: {
        flex: 1,
        paddingRight: 16,
        alignItems: 'flex-start'
    },
    itemOption: {
        color: GRAY,
        marginTop: 8,
    },
    itemPrice: {
        fontSize: 18,
        marginBottom: 8,
        marginTop: 16
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: VERY_LIGHT_GRAY,
        marginBottom: 8
    },
    salePrice: {
        fontSize: 18,
        color: COLOR2,
        marginBottom: 8
    },
    btn: {
        minWidth: 68
    }
})