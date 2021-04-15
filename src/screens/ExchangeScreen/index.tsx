import { Route, StackActions, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import BaseText, { baseTextStyle } from '../../components/Text/BaseText'
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/View/StatusBarHeightView'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { IS_IOS, EXCHANGE_REASON } from '../../constants/values'
import useInput from '../../hooks/useInput'
import useSelectBottomSheet from '../../hooks/useSelectBottomSheet'
import moneyFormat from '../../lib/moneyFormat'
import { useOrder, useExchangeOrder } from '../../graphql/order'
import ItemInfoSkeleton from '../../components/Skeleton/ItemInfoSkeleton'

const INFO = `

교환/환불 가능 여부는 [해당 상품 상세페이지 > 주문정보 탭]을 확인하여 주시기 바랍니다.

정확한 확인을 원하시면 [해당 상품 상세페이지 > 문의 탭]을 통해 먼저 문의해보실 수 있습니다.`

interface ExchangeScreenProps {
    id: number
}

const ExchangeScreen = () => {

    const { dispatch, navigate } = useNavigation()
    const { params } = useRoute<Route<'Exchange', ExchangeScreenProps>>()
    const { open } = useSelectBottomSheet()

    const { data } = useOrder({ variables: { id: params.id } })
    const [exchangeOrder, { loading }] = useExchangeOrder()
    const [reason, setReason] = useState<string | null>(null)
    const [reasonDetail, onChangeReasonDetail] = useInput()
    const active = !!reason

    const onSubmit = useCallback(async () => {
        if (!active) return
        if (!reason) return
        if (loading) return
        await exchangeOrder({
            variables: {
                input: {
                    id: params.id,
                    reason,
                    reasonDetail
                }
            }
        })
        dispatch(StackActions.replace('ExchangeDetail', params))
    }, [active, params, reason, reasonDetail, loading])

    const onReason = useCallback(() => {
        open(
            EXCHANGE_REASON,
            (i) => setReason(EXCHANGE_REASON[i])
        )
    }, [open, setReason])

    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior='padding'
                enabled={IS_IOS}
            >
                <ScrollView>
                    <DefaultHeader title='교환하기' disableBtns />
                    {data
                        ? <Pressable onPress={() => navigate('ItemDetail', { id: data.order.item.id })} style={styles.itemContainer} >
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
                        </Pressable>
                        : <ItemInfoSkeleton />
                    }
                    <View style={styles.reasonContainer} >
                        <Pressable
                            onPress={onReason}
                            style={styles.reasonSelector}
                        >
                            <BaseText style={{ color: reason ? '#000' : GRAY }} >{reason || '교환 사유 선택'}</BaseText>
                            <DownArrowIcon />
                        </Pressable>
                    </View>

                    <TextInput
                        value={reasonDetail}
                        onChangeText={onChangeReasonDetail}
                        placeholderTextColor={GRAY}
                        placeholder={'상세사유를 적어주세요' + INFO}
                        multiline
                        maxLength={1000}
                        style={[baseTextStyle, styles.input]}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
            <ButtonFooter
                active={active}
                text='교환 신청'
                onPress={onSubmit}
                loading={loading}
            />
        </ScreenLayout>
    )
}

export default ExchangeScreen

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1
    },
    notification: {
        color: GRAY,
        lineHeight: 32,
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    reasonContainer: {
        width: '100%',
        height: 80,
        backgroundColor: VERY_LIGHT_GRAY,
        padding: 16
    },
    reasonSelector: {
        flex: 1,
        borderRadius: 8,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemContainer: {
        width: '100%',
        paddingHorizontal: 16,
        paddingBottom: 24,
        paddingTop: 24,
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
    input: {
        paddingHorizontal: 16,
        paddingVertical: 0,
        marginVertical: 24,
        lineHeight: 20,
        textAlignVertical: 'top'
    }
})
