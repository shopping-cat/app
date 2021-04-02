import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React from 'react'
import { Image, ScrollView, StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'
import { useOrder } from '../../graphql/order'
import LoadingView from '../../components/View/LoadingView'

interface ExchangeDetailScreenProps {
    id: number
}

const ExchangeDetailScreen = () => {

    const { params } = useRoute<Route<'ExchangeDetail', ExchangeDetailScreenProps>>()
    const { data } = useOrder({ variables: { id: params.id } })
    const { goBack } = useNavigation()

    return (
        <ScreenLayout>
            <DefaultHeader title='교환상세' disableBtns />
            {!data && <LoadingView />}
            {data && <ScrollView
                style={styles.container}
                overScrollMode='never'
            >
                <View style={styles.infoContainer} >
                    <BaseText style={styles.title} >교환 방법</BaseText>
                    <BaseText style={styles.content} >{data.order.item.shop.exchangeInfo}</BaseText>
                </View>

                <View style={styles.infoContainer} >
                    <BaseText style={styles.title} >상품 정보</BaseText>
                    <View style={styles.itemContainer} >
                        <Image
                            source={{ uri: data.order.item.mainImage }}
                            style={styles.itemImage}
                        />
                        <View>
                            <BaseText numberOfLines={1} >{data.order.item.name}</BaseText>
                            <BaseText style={styles.itemOption} numberOfLines={1} >{data.order.stringOptionNum}</BaseText>
                            <View style={styles.itemPriceContainer} >
                                <BaseText style={styles.itemPrice}  >{moneyFormat(data.order.totalPrice)}원</BaseText>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.infoContainer} >
                    <BaseText style={styles.title} >교환 사유</BaseText>
                    <BaseText style={styles.content} >{data.order.reason}</BaseText>
                </View>

                <View style={styles.infoContainer} >
                    <BaseText style={styles.title} >상세 사유</BaseText>
                    <BaseText style={styles.content} >{data.order.reasonDetail || '없음'}</BaseText>
                </View>

            </ScrollView>}
            <ButtonFooter
                active
                text='돌아가기'
                onPress={goBack}
            />
        </ScreenLayout>
    )
}

export default ExchangeDetailScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    infoContainer: {
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    title: {
        fontSize: 18,
        marginBottom: 24
    },
    content: {
        flex: 1,
        paddingLeft: 8,
        color: GRAY,
        lineHeight: 20,
    },
    itemContainer: {
        width: '100%',
        paddingHorizontal: 8,
        flexDirection: 'row'
    },
    itemImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    itemOption: {
        color: GRAY,
        marginTop: 8,
        marginBottom: 8
    },
    itemPriceContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    itemPrice: {
        fontSize: 16
    },
    itemNumber: {
        color: GRAY,
        marginLeft: 8
    },
    labelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 8,
        marginBottom: 24
    },
    label: {
        color: GRAY,
    }
})