import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import BaseText from '../../components/BaseText'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import useInput from '../../hooks/useInput'

const dummyBankList = ['농협', '카카오뱅크', '신한은행', '신협', '경기은행', '새마을은행', '농협', '카카오뱅크', '신한은행', '신협', '경기은행', '새마을은행', '농협', '카카오뱅크', '신한은행', '신협', '경기은행', '새마을은행', '농협', '카카오뱅크', '신한은행', '신협', '경기은행', '새마을은행']

const RefundAccountScreen = () => {

    // data
    const [bank, setBank] = useState<null | string>(null)
    const [name, onChangeName] = useInput('')
    const [accountNumber, onChangeAccountNumber] = useInput('')
    // ui state
    const [bankSelectorVisible, setBankSelectorVisible] = useState(false)

    const active = bank && name && accountNumber

    const onSubmit = useCallback(() => {

    }, [active])

    const onBank = useCallback(() => {
        setBankSelectorVisible(true)
    }, [])

    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior='padding'
                enabled={IS_IOS}
            >
                <DefaultHeader title='환불계좌' disableBtns />
                <View style={styles.body} >
                    <View style={styles.explanationContainer} >
                        <BaseText style={styles.explanation} >{`환불 가능한 계좌를 정확히 입력해주세요.\n승인취소가 불가능한 결제 건은 계좌 환불이 진행됩니다.`}</BaseText>
                    </View>
                    <View style={styles.bankSelectorContainer} >
                        <Pressable
                            onPress={onBank}
                            style={styles.bankSelector}
                        >
                            <BaseText style={{ color: bank ? '#000' : GRAY }} >{bank || '은행선택'}</BaseText>
                            <DownArrowIcon />
                        </Pressable>
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={GRAY}
                            placeholder='예금주'
                            value={name}
                            onChangeText={onChangeName}
                            style={[styles.text]}
                        />
                        <View style={styles.inputLine} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={GRAY}
                            placeholder='계좌번호'
                            value={accountNumber}
                            onChangeText={onChangeAccountNumber}
                            style={[styles.text]}
                            keyboardType='number-pad'
                        />
                        <View style={styles.inputLine} />
                    </View>
                </View>
            </KeyboardAvoidingView>
            <ButtonFooter
                active={active}
                onPress={onSubmit}
                text='환불계좌 변경'
            />
            <SelectBottomSheet
                visible={bankSelectorVisible}
                onClose={() => setBankSelectorVisible(false)}
                list={dummyBankList}
                onSelect={(i) => setBank(dummyBankList[i])}
            />
        </ScreenLayout>
    )
}

export default RefundAccountScreen

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1
    },
    body: {
        flex: 1
    },
    explanationContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    explanation: {
        lineHeight: 32,
        color: GRAY
    },
    bankSelectorContainer: {
        width: '100%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        backgroundColor: VERY_LIGHT_GRAY
    },
    bankSelector: {
        flex: 1,
        width: '100%',
        borderRadius: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    inputContainer: {
        width: '100%',
        height: 56,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    inputLine: {
        height: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1,
        position: 'absolute',
        bottom: 0,
        right: 16,
        left: 16
    },
    text: {
        fontSize: 16,
        marginHorizontal: 16,
        padding: 0,
        fontFamily: 'BMJUA'
    }
})