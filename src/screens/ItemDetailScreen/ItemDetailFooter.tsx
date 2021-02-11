import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { atan } from 'react-native-reanimated'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseText from '../../components/BaseText'
import TouchableScale from '../../components/Buttons/TouchableScale'
import { COLOR1, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { ItemDetail, useLikeItem } from '../../graphql/item'
import numberToKoreanUnit from '../../lib/numberToKoreanUnit'


interface ItemDetailFooter {
    onBuy: () => void
    data: ItemDetail
}

const ItemDetailFooter: React.FC<ItemDetailFooter> = ({ onBuy, data }) => {

    const [likeItem] = useLikeItem()
    const [firstLoadinglikeNum] = useState(data.likeNum)
    const [firstLoadingLiked] = useState(data.isILiked)
    const [liked, setLiked] = useState(data.isILiked)

    const currentLikedNum = firstLoadinglikeNum + (firstLoadingLiked === liked ? 0 : liked ? 1 : -1)

    const onLike = useCallback(() => {
        likeItem({
            variables: {
                itemId: data.id,
                like: !liked
            }
        })
        setLiked(!liked)
    }, [liked])

    const onBigBuy = useCallback(() => {
        if (data.state !== 'sale') return
        onBuy()
    }, [onBuy])

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
                <BaseText style={[styles.likeNumText, { color: liked ? COLOR1 : GRAY }]} >{numberToKoreanUnit(currentLikedNum)}</BaseText>
            </TouchableScale>
            <TouchableScale
                onPress={onBigBuy}
                style={[styles.bigBuyContainer, { backgroundColor: data.state === 'sale' ? COLOR1 : LIGHT_GRAY }]}
                contianerStyle={styles.bigBuyTouchableContainer}
                targetScale={0.9}
            >
                <BaseText style={styles.bigBuyText} >{data.state === 'sale' ? '구매하기' : data.state === 'noStock' ? '재고없음' : '판매중지'}</BaseText>
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
    bigBuyTouchableContainer: {
        flex: 1,
        height: 48,
        marginRight: 16,
        borderRadius: 12,
    },
    bigBuyContainer: {
        flex: 1,
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigBuyText: {
        fontSize: 20,
        color: '#fff'
    }
})
