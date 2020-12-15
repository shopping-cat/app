import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseText from '../../components/BaseText'
import TouchableScale from '../../components/Buttons/TouchableScale'
import { COLOR1, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'

const isSale = true

const ItemDetailFooter = () => {

    const [liked, setLiked] = useState(false)

    const onLike = useCallback(() => {
        setLiked(!liked)
    }, [liked])

    const onBigBuy = useCallback(() => {
        if (!isSale) return
    }, [])

    return (
        <View style={styles.container} >
            <TouchableScale
                onPress={onLike}
                style={styles.likeContainer}
            >
                {liked
                    ? <Icon name='heart' size={24} color={COLOR1} />
                    : <Icon name='heart-outline' size={24} color={GRAY} />
                }
                <BaseText style={[styles.likeNumText, { color: liked ? COLOR1 : GRAY }]} >4.1천</BaseText>
            </TouchableScale>
            <TouchableScale
                onPress={onBigBuy}
                style={[styles.bigBuyContainer, { backgroundColor: isSale ? COLOR1 : LIGHT_GRAY }]}
                targetScale={0.9}
            >
                <BaseText style={styles.bigBuyText} >구매하기</BaseText>
            </TouchableScale>
        </View>
    )
}

export default ItemDetailFooter

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: VERY_LIGHT_GRAY,
        borderTopWidth: 1
    },
    likeContainer: {
        width: 80,
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    likeNumText: {
        marginTop: 4
    },
    bigBuyContainer: {
        flex: 1,
        height: 48,
        marginRight: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigBuyText: {
        fontSize: 20,
        color: '#fff'
    }
})
