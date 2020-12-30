import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import BaseText from '../../components/BaseText'
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RightArrowIcon from '../../components/Svgs/RightArrowIcon'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import useInput from '../../hooks/useInput'


const AddressScreen = () => {

    const { navigate } = useNavigation()
    const [postalCode, setPostalCode] = useState('')
    const [address, setAddress] = useState('')
    const [addressDetail, onChangeAddressDetail] = useInput('')
    const [name, onChangeName] = useInput('')
    const [phone, onChangePhone] = useInput('')

    const active = postalCode && address && addressDetail && name && phone

    const onPostalCode = useCallback(() => {
        navigate('AddressSearch')
    }, [])

    const onSubmit = useCallback(() => {
        if (!active) return
    }, [active])

    return (
        <ScreenLayout>
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior='padding'
                enabled={IS_IOS}
            >
                <DefaultHeader title='배송지' disableBtns />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    overScrollMode='never'
                >
                    <Pressable
                        onPress={onPostalCode}
                        style={styles.inputContainer}
                    >
                        <BaseText style={[styles.text, { color: postalCode ? '#000' : GRAY }]} >{postalCode || '우편번호'}</BaseText>
                        <View style={styles.postalIcon} >
                            <RightArrowIcon fill={GRAY} />
                        </View>
                        <View style={styles.postalCodeInputLine} />
                    </Pressable>
                    <View style={styles.inputContainer}>
                        <BaseText style={[styles.text, { color: postalCode ? '#000' : GRAY }]} >{address || '주소'}</BaseText>
                        <View style={styles.inputLine} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={GRAY}
                            placeholder='상세주소'
                            value={addressDetail}
                            onChangeText={onChangeAddressDetail}
                            style={[styles.text]}
                        />
                        <View style={styles.inputLine} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={GRAY}
                            placeholder='받는 분'
                            value={name}
                            onChangeText={onChangeName}
                            style={[styles.text]}
                        />
                        <View style={styles.inputLine} />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholderTextColor={GRAY}
                            placeholder='연락처'
                            keyboardType='number-pad'
                            value={phone}
                            onChangeText={onChangePhone}
                            style={[styles.text]}
                        />
                        <View style={styles.inputLine} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <ButtonFooter
                active={active}
                onPress={onSubmit}
                text='배송지 입력하기'
            />

        </ScreenLayout>
    )
}

export default AddressScreen

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1
    },
    inputContainer: {
        width: '100%',
        height: 56,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    postalCodeInputLine: {
        height: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1,
        position: 'absolute',
        bottom: 0,
        right: 56,
        left: 16
    },
    postalIcon: {
        position: 'absolute',
        right: 16
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
