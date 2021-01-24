import { StackActions, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Image, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native'
import BaseText, { baseTextStyle } from '../../components/BaseText'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { IS_IOS, EXCHANGE_REASON } from '../../constants/values'
import useInput from '../../hooks/useInput'
import useSelectBottomSheet from '../../hooks/useSelectBottomSheet'
import moneyFormat from '../../lib/moneyFormat'

const dummyImage = 'https://image.hanssem.com/hsimg/gds/368/760/760474_A1.jpg'
const dummyName = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const option = '해먹 | 베이지'
const price = 79000
const number = 1

const ExchangeScreen = () => {

    const { dispatch } = useNavigation()
    const { open } = useSelectBottomSheet()

    const [reason, setReason] = useState<string | null>(null)
    const [reasonDetail, onChangeReasonDetail] = useInput()
    const active = !!reason

    const onSubmit = useCallback(() => {
        if (!active) return
        dispatch(StackActions.replace('ExchangeDetail'))
    }, [active])

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
                    <View style={styles.itemContainer} >
                        <Image
                            source={{ uri: dummyImage }}
                            style={styles.itemImage}
                        />
                        <View>
                            <BaseText numberOfLines={1} >{dummyName}</BaseText>
                            <BaseText style={styles.itemOption} numberOfLines={1} >{option}</BaseText>
                            <View style={styles.itemPriceContainer} >
                                <BaseText style={styles.itemPrice}  >{moneyFormat(price)}원</BaseText>
                                <BaseText style={styles.itemNumber} >{number}개</BaseText>
                            </View>
                        </View>
                    </View>

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
                        placeholder='상세사유를 적어주세요'
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
        fontSize: 18
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
