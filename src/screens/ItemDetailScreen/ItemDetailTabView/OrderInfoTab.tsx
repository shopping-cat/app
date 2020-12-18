import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Hyperlink from 'react-native-hyperlink'
import BaseText from '../../../components/BaseText'
import { COLOR2, GRAY } from '../../../constants/styles'

const dummyOrderInfos = [
    {
        title: '결제',
        content: `1. 무통장 입금 후 2시간 이내에 입금 확인 메시지를 받지 못하신 경우에는 에이블리 고객센터로 연락주시기 바랍니다.\n\n2. 무통장 입금 시, 주문 금액과 입금 금액이 다른 경우, 주문 시 기재한 입금자 성함과 실제 입금자 성함이 다른 경우 등에는 배송이 지연됩니다. 이러한 경우에는 빠른 배송을 위해 에이블리 고객센터로 연락주시기 바랍니다.\n\n3. 주문 후 24시간 이내에 결제가 확인되지 않을 경우, 주문은 자동 취소됩니다.`
    },
    {
        title: '주문 취소 및 변경',
        content: `1. 배송 전 주문 취소는 [마이페이지 > 주문 내역 > 주문 취소]에서 처리 가능합니다.\n\n2. 배송 전 주문 변경은 평일 12:00시 이전에 슈가파우더 고객센터로 연락주시기 바랍니다.\n\n3. 주문 변경 및 배송 중 주문 취소 등은 슈가파우더 고객센터로 연락주시기 바랍니다.\n\n4. 배송 중 주문 변경 및 주문 취소는 교환/환불로 처리되어, 추가 배송비가 발생할 수 있습니다. 자세한 사항은 슈가파우더 고객센터로 연락주시기 바랍니다.\n\n5. 맞춤제작상품은 주문 취소가 어려울 수 있으므로 자세한 사항은 슈가파우더 고객센터로 연락주시기 바랍니다.`
    },
    {
        title: '배송',
        content: `1. 에이블리에서 구매하시는 슈가파우더의 모든 상품은 365일 무료 배송입니다. (제주도 및 도서산간 일부 지역의 경우, 추가 배송비가 발생할 수 있습니다.)\n\n2. 슈가파우더의 평균 상품 준비 기간은 평일 기준 2~3일 이며, 상품 공급자 사정에 따라 최대 7일까지 지연될 수 있습니다.`
    },
    {
        title: '교환 신청',
        content: `1. 교환은 고객님께서 상품을 수령하신 후, 7일 이내에 [마이페이지 > 주문 내역 > 해당 상품 > 교환 문의]에서 신청이 가능합니다.\n\n상품에 향수 기타 등의 오염이 되어있을 경우 교환/반품이 불가\n\n2. 교환은 1회에 한해서 동일 상품의 옵션 변경에 의한 교환만 가능합니다.\n\n• 맞춤제작상품은 교환이 어려울 수 있으므로 자세한 사항은 슈가파우더 고객센터로 연락주시기 바랍니다.\n\n3. 교환 배송비가 발생하며, 교환 배송비 입금이 확인된 경우에만 교환 후 상품 배송이 가능합니다.\n\n• (특별 구간: 제주도 및 도서산간 일부 지역) 11,000원\n\n• (특별 구간 외 지역) 5,000원`
    },
    {
        title: '반품 접수',
        content: `1. 반품은 고객님께서 상품을 수령하신 후, 7일 이내에 [마이페이지 > 주문 내역 > 해당 상품 > 반품 접수]에서 신청이 가능합니다.\n\n상품에 향수 기타 등의 오염이 되어있을 경우 교환/반품이 불가\n\n2. 단순 변심에 의한 반품의 경우 추가 배송비가 발생하며, 반품 배송비가 차감된 금액이 환불됩니다.\n\n• 단, 맞춤제작상품은 단순변심에 의한 반품이 어려울 수 있으므로 자세한 사항은 슈가파우더 고객센터로 연락주시기 바랍니다\n\n• (특별 구간: 제주도 및 도서산간 일부 지역) 전체 반품 11,000원 (고객님이 주문하실 때 부담하신 추가 배송비는 차감) | 부분 반품 5,500원\n\n• (특별 구간 외 지역) 전체 반품 5,000원 | 부분 반품 2,500원`
    },
    {
        title: '교환/반품 택배 접수 안내',
        content: `1. 기본 안내\n\n교환/반품 회수접수는 슈가파우더에서 자체진행합니다. 고객님게서 개별적으로 따로 접수불가(개별접수시 추가금액 부담)\n\n2. 교환/반품지명\n\n• 슈가파우더\n\n3. 교환/반품지 주소\n\n• 우편번호: 13595\n\n• 주소: 경기 성남시 분당구 수내동 14 CJ대한통운 분당창대대리점`
    }
]

const OrderInfoTab = () => {
    return (
        <View style={styles.container} >
            {dummyOrderInfos.map(({ content, title }) =>
                <View>
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
        width: '100%',
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
