import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import BaseText from '../../../components/Text/BaseText'
import { COLOR2, GRAY, WIDTH } from '../../../constants/styles'
import { ItemDetail } from '../../../graphql/item'
import moneyFormat from '../../../lib/moneyFormat'


const OrderInfoTab: React.FC<ItemDetail> = ({ shop, deliveryPrice, extraDeliveryPrice }) => {

    const orderInfo = [
        {
            title: '주문 취소',
            content: `1. 결제후 30분이내에 [마이페이지 > 주문 내역 > 주문 취소]에서 주문 취소 가능합니다.\n\n2. 결제후 30분이 지났다면 [해당 상품의 상세페이지 > 문의 > 채팅으로 문의하기]를 통해 직접 취소 요청을 보내야합니다.`
        },
        {
            title: '배송',
            content: `1. 해당상품의 배송비용은 ${moneyFormat(deliveryPrice)}입니다.\n\n2. 제주도 및 도서산간 일부 지역의 경우, ${moneyFormat(extraDeliveryPrice)}원의 추가 배송비가 발생합니다.\n\n3. ${shop.shopName}의 평균 상품 준비 기간은 평일 기준 2~3일 이며, 상품 공급자 사정에 따라 최대 7일까지 지연될 수 있습니다.`
        },
        {
            title: '교환 신청',
            content: `1. 교환은 고객님께서 상품을 수령하신 후, 7일 이내에 [마이페이지 > 주문내역 > 해당주문 > 교환하기]에서 신청이 가능합니다.\n\n2. 상품에 향수 기타 등의 오염이 되어있을 경우 교환/반품이 불가\n\n3. 교환은 1회에 한해서 동일 상품의 옵션 변경에 의한 교환만 가능합니다.\n\n4. 맞춤제작상품은 교환이 어려울 수 있으므로 자세한 사항은 ${shop.shopName} 고객센터로 연락주시기 바랍니다.\n\n5. 교환 배송비가 발생하며, 교환 배송비 입금이 확인된 경우에만 교환 후 상품 배송이 가능합니다.`
        },
        {
            title: '반품 접수',
            content: `1. 반품은 고객님께서 상품을 수령하신 후, 7일 이내에 [마이페이지 > 주문내역 > 해당주문 > 환불하기]에서 신청이 가능합니다.\n\n2. 상품에 향수 기타 등의 오염이 되어있을 경우 교환/반품이 불가\n\n3. 단순 변심에 의한 반품의 경우 추가 배송비가 발생하며, 자세한 내용은 환불하기 페이지를 참조바랍니다.\n\n4. 단, 맞춤제작상품은 단순변심에 의한 반품이 어려울 수 있으므로 자세한 사항은 ${shop.shopName} 고객센터로 연락주시기 바랍니다`
        }
    ]


    return (
        <View style={styles.container} >
            {orderInfo.map(({ content, title }) =>
                <View key={title} >
                    <BaseText style={styles.title} >{title}</BaseText>
                    <Hyperlink
                        linkStyle={{ color: COLOR2 }}
                        linkDefault={true}
                    >
                        <BaseText style={styles.content} >{content}</BaseText>
                    </Hyperlink>
                </View>
            )}
        </View>
    )
}

export default OrderInfoTab

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        paddingHorizontal: 16,
        paddingTop: 24
    },
    title: {
        fontSize: 16,
        marginBottom: 16
    },
    content: {
        color: GRAY,
        marginBottom: 24,
        lineHeight: 20
    }
})
