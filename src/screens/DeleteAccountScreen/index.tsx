import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { useWithdrawalUser } from '../../graphql/user'
import useAuth from '../../hooks/useAuth'
import useConfirm from '../../hooks/useConfirm'
import StatusBarHeightView from '../../components/View/StatusBarHeightView'

const DeleteAccountScreen = () => {

    const [deleteAccount, { loading }] = useWithdrawalUser()
    const { show } = useConfirm()
    const { logout } = useAuth()

    const onDeleteAccount = useCallback(async () => {
        if (loading) return
        show(
            '정말 탈퇴하시겠습니까?',
            '탈퇴전에 화면의 내용 꼭 숙지 바랍니다.',
            async () => {
                await deleteAccount()
                await logout()
            }
        )
    }, [loading])

    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <DefaultHeader title='회원탈퇴' disableBtns />
            <View style={styles.container} >
                <BaseText style={styles.text} >회원탈퇴 시 계정과 관련된 정보는 복구가 불가하며 30일 이후 재가입 가능합니다.</BaseText>
                <View style={styles.line} />
                <BaseText style={styles.text} >쿠폰과 포인트는 모두 소멸되며 재가입 후에도 복구 할 수 없습니다.</BaseText>
                <View style={styles.line} />
            </View>
            <ButtonFooter
                active
                onPress={onDeleteAccount}
                text='계정 삭제'
                loading={loading}
            />
        </ScreenLayout>
    )
}

export default DeleteAccountScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    text: {
        color: GRAY,
        lineHeight: 32,
        marginVertical: 24
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: VERY_LIGHT_GRAY
    }
})