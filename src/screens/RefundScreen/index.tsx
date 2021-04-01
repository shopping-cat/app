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
import { IS_IOS, REFUND_REASONS } from '../../constants/values'
import useInput from '../../hooks/useInput'
import useSelectBottomSheet from '../../hooks/useSelectBottomSheet'
import moneyFormat from '../../lib/moneyFormat'
import { useOrder, useRefundOrder } from '../../graphql/order'
import ItemInfoSkeleton from '../../components/Skeleton/ItemInfoSkeleton'


interface RefundScreenProps {
    id: number
}

const RefundScreen = () => {

    const { dispatch } = useNavigation()
    const { params } = useRoute<Route<'Refund', RefundScreenProps>>()
    const { open } = useSelectBottomSheet()

    const { data } = useOrder({ variables: { id: params.id } })
    const [refundOrder, { loading }] = useRefundOrder()
    const [reason, setReason] = useState<string | null>(null)
    const [reasonDetail, onChangeReasonDetail] = useInput()
    const active = !!reason

    const onSubmit = useCallback(async () => {
        if (!active) return
        if (!reason) return
        await refundOrder({
            variables: {
                input: {
                    id: params.id,
                    reason,
                    reasonDetail
                }
            }
        })
        dispatch(StackActions.replace('RefundDetail', params))
    }, [active, params, reason, reasonDetail])

    const onReason = useCallback(() => {
        open(
            REFUND_REASONS,
            (i) => setReason(REFUND_REASONS[i])
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
                    <DefaultHeader title='환불하기' disableBtns />
                    {data
                        ? <View style={styles.itemContainer} >
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
                        : <ItemInfoSkeleton />
                    }

                    <View style={styles.reasonContainer} >
                        <Pressable
                            onPress={onReason}
                            style={styles.reasonSelector}
                        >
                            <BaseText style={{ color: reason ? '#000' : GRAY }} >{reason || '취소 사유 선택'}</BaseText>
                            <DownArrowIcon />
                        </Pressable>
                    </View>
                    <TextInput
                        value={reasonDetail}
                        onChangeText={onChangeReasonDetail}
                        placeholderTextColor={GRAY}
                        placeholder='상세사유를 적어주세요'
                        multiline
                        maxLength={1000}
                        style={[baseTextStyle, styles.input]}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
            <ButtonFooter
                active={active}
                text='환불 신청'
                onPress={onSubmit}
                loading={loading}
            />
        </ScreenLayout>
    )
}

export default RefundScreen

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
    }
})
