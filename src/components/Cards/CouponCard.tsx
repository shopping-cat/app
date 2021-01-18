import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'
import BaseText from '../BaseText'

const image = 'https://i.guim.co.uk/img/media/7d04c4cb7510a4bd9a8bec449f53425aeccee895/289_287_1442_866/master/1442.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=6b7cb2d2ab7847fb0623d2757c1260ba'
const name = '리뷰 작성 쿠폰'
const salePercent = 10
const salePrice = 10000
const period = '15일 남음' // 오늘 만료 예정 처리
const minItemPrice = 2000
const maxSalePrice = 10000


const CouponCard = () => {
    return (
        <View style={styles.container} >
            <Image
                source={{ uri: image }}
                style={styles.image}
            />
            <View style={styles.right} >
                <View style={styles.infoContainer} >
                    <BaseText style={styles.sale} >{salePercent || moneyFormat(salePrice || 0)}{salePercent ? '%' : '원'}</BaseText>
                    <BaseText>{name}</BaseText>
                    <BaseText style={[styles.period, { color: false ? COLOR1 : GRAY }]}>{period}</BaseText>
                </View>
                {(minItemPrice || maxSalePrice) &&
                    <BaseText style={styles.noti} >
                        {minItemPrice && `${moneyFormat(minItemPrice)}원 이상의 상품 구매시 사용가능`}{minItemPrice && maxSalePrice && ' | '}{maxSalePrice && `최대 ${moneyFormat(maxSalePrice)}원 할인`}
                    </BaseText>
                }
            </View>
        </View>
    )
}

export default CouponCard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        flexDirection: 'row',
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    right: {
        flex: 1
    },
    infoContainer: {
        height: 64,
        justifyContent: 'space-between'
    },
    sale: {
        color: COLOR2,
        fontSize: 18,
    },
    period: {
        fontSize: 12
    },
    noti: {
        fontSize: 12,
        color: GRAY,
        marginTop: 16,
        flex: 1,
        lineHeight: 16
    }
})
