import React, { useCallback } from 'react'
import { StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import LabelUnderLineButton from '../../components/Buttons/LabelUnderLineButton'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import ThinLine from '../../components/View/ThinLine'
import { GRAY } from '../../constants/styles'

const NOTI = `상품관련 문의는 [해당 상품 상세페이지 > 문의 탭]에서 문의 하여 주시기 바랍니다.`

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
                {NOTI}
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
