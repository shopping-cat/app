import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import BaseText, { baseTextStyle } from '../../components/Text/BaseText'
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RightArrowIcon from '../../components/Svgs/RightArrowIcon'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import { useIUser, useUpdateDeliveryInfo } from '../../graphql/user'
import useInput from '../../hooks/useInput'
import phoneFormat from '../../lib/phoneFormat'
import numberFormat from '../../lib/numberFormat'


const AddressScreen = () => {

    const { navigate, goBack } = useNavigation()

    const { data } = useIUser()
    const [updateDeliveryInfo, { loading }] = useUpdateDeliveryInfo()

    const [postCode, setPostCode] = useState('')
    const [address, setAddress] = useState('')
    const [addressDetail, onChangeAddressDetail, setAddressDetail] = useInput('')
    const [name, onChangeName, setName] = useInput('')
    const [phone, onChangePhone, setPhone] = useInput('')

    const active = postCode && address && addressDetail && name && phone

    useEffect(() => {
        if (!data) return
        if (!data.iUser.deliveryInfo) return
        setPostCode(data.iUser.deliveryInfo.postCode)
        setAddress(data.iUser.deliveryInfo.address)
        setAddressDetail(data.iUser.deliveryInfo.addressDetail)
        setName(data.iUser.deliveryInfo.name)
        setPhone(data.iUser.deliveryInfo.phone)
    }, [data])

    const onPostCode = useCallback(() => {
        navigate('AddressSearch', { setPostCode, setAddress })
    }, [setPostCode, setAddress])

    const onSubmit = useCallback(async () => {
        if (!postCode) return
        if (!address) return
        if (!addressDetail) return
        if (!name) return
        if (!phone) return
        try {
            await updateDeliveryInfo({
                variables: {
                    postCode,
                    address,
                    addressDetail,
                    name,
                    phone
                }
            })
            goBack()
        } catch (error) {
            console.error(error)
        }
    }, [postCode, address, addressDetail, name, phone])

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
                        onPress={onPostCode}
                        style={styles.inputContainer}
                    >
                        <BaseText style={[styles.text, { color: postCode ? '#000' : GRAY }]} >{postCode || '우편번호'}</BaseText>
                        <View style={styles.postalIcon} >
                            <RightArrowIcon fill={GRAY} />
                        </View>
                        <View style={styles.postalCodeInputLine} />
                    </Pressable>
                    <View style={styles.inputContainer}>
                        <BaseText style={[styles.text, { color: postCode ? '#000' : GRAY }]} >{address || '주소'}</BaseText>
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
                            value={phoneFormat(phone)}
                            onChangeText={(t) => onChangePhone(numberFormat(t))}
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
                loading={loading}
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
        ...baseTextStyle,
        fontSize: 16,
        marginHorizontal: 16,
        padding: 0,
    }
})
