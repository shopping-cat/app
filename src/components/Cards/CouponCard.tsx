import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { Coupon } from '../../graphql/coupon'
import dateFormat from '../../lib/dateFormat'
import moneyFormat from '../../lib/moneyFormat'
import BaseSkeletonPlaceHolder from '../Loading/BaseSkeletonPlaceHolder'
import BaseText from '../Text/BaseText'



const CouponCard: React.FC<Coupon> = ({ image, maxSalePrice, minItemPrice, name, period, salePercent, salePrice }) => {
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
                    <BaseText style={[styles.period, { color: false ? COLOR1 : GRAY }]}>{dateFormat(period)}</BaseText>
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

export const CouponCardSkeleton = () => {
    return (
        <BaseSkeletonPlaceHolder>
            <View style={styles.container} >
                <View style={styles.image} />
                <View style={styles.right} >
                    <View style={{ width: '50%', height: 16, borderRadius: 6 }} />
                    <View style={{ width: '35%', height: 16, borderRadius: 6, marginTop: 16 }} />
                </View>
            </View>
        </BaseSkeletonPlaceHolder>
    )
}

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
