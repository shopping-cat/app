import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import BaseText from '../../components/BaseText'
import LabelUnderLineButton from '../../components/Buttons/LabelUnderLineButton'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import ThinLine from '../../components/ThinLine'
import { GRAY } from '../../constants/styles'

const dummyNoti = `포인트는 각각 상품마다 상품 가격 비율에 맞게 적용됩니다.
부분적으로 환불/취소 하실시 포인트도 부분적으로 환불됩니다.`

const InqueryScreen = () => {

    const onChatting = useCallback(() => {
        // 채널톡
    }, [])

    const onSalesContact = useCallback(() => {
        // 카카오톡 오픈채팅 으로 연결
    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='문의/건의' disableBtns />
            <BaseText
                style={styles.noti}
            >
                {dummyNoti}
            </BaseText>
            <ThinLine />
            <View style={styles.body} >
                <LabelUnderLineButton
                    label='채팅문의'
                    onPress={onChatting}
                />
                <LabelUnderLineButton
                    label='판매자 입점 문의'
                    onPress={onSalesContact}
                />
            </View>
        </ScreenLayout>
    )
}

export default InqueryScreen

const styles = StyleSheet.create({
    noti: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        color: GRAY,
        lineHeight: 32
    },
    body: {
        paddingHorizontal: 16
    }
})
