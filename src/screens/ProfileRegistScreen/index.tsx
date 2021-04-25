import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import ImagePicker, { Image as ImageFile } from 'react-native-image-crop-picker';
import BaseText from '../../components/Text/BaseText';
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import UnderLineInput from '../../components/Input/UnderLineInput'
import { COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles';
import { useRegistUserProfile } from '../../graphql/user';
import useInput from '../../hooks/useInput'
import generateImageToRNFile from '../../lib/generateRNFile';
import UnderLineText from '../../components/Text/UnderLineText';
import CheckBoxToggle from '../../components/Toggle/CheckBoxToggle';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ProfileRegistScreen = () => {

    const { reset, navigate } = useNavigation()

    const [registUserProfile, { loading }] = useRegistUserProfile()

    const [image, setImage] = useState<ImageFile | null>(null)
    const [name, onChangeName] = useInput('')

    const [termsOfServiceAllow, setTermsOfServiceAllow] = useState(false)
    const [privacyPolicyAllow, setPrivacyPolicyAllow] = useState(false)
    const [eventMessageAllow, setEventMessageAllow] = useState(false)

    const active = name.length > 0 && termsOfServiceAllow && privacyPolicyAllow

    const onAllAllow = useCallback(() => {
        setTermsOfServiceAllow(true)
        setPrivacyPolicyAllow(true)
        setEventMessageAllow(true)
    }, [])

    const onImage = useCallback(async () => {
        try {
            const image = await ImagePicker.openPicker({
                width: 512,
                height: 512,
                cropping: true,
                mediaType: 'photo',
                cropperCircleOverlay: true,
                cropperCancelText: '취소',
                loadingLabelText: '불러오는중',
                cropperChooseText: '완료'
            })
            setImage(image)
        } catch (error) {
            console.error(error)
        }
    }, [])

    const onSave = useCallback(async () => {
        if (!active) return
        if (loading) return
        try {
            const file = image ? generateImageToRNFile(image.path, 'userProfile') : null
            const { errors } = await registUserProfile({
                variables: {
                    input: {
                        name,
                        photo: file,
                        eventMessageAllow
                    }
                }
            })
            if (!!errors) throw new Error
            reset({
                index: 0,
                routes: [{ name: 'Tab' }]
            })
        } catch (error) {
            console.error(error)
        }
    }, [active, name, image, loading, eventMessageAllow])

    return (
        <ScreenLayout>
            <DefaultHeader title='회원정보입력' disableGoBack disableBtns />
            <View style={styles.container}  >
                <Pressable
                    onPress={onImage}
                >
                    {image && <Image
                        style={styles.image}
                        source={{ uri: image?.path }}
                    />}
                    {!image && <View style={styles.changeContainer} >
                        <BaseText style={styles.change} >사진을 등록해주세요</BaseText>
                    </View>}
                </Pressable>
                <UnderLineInput
                    value={name}
                    onChangeText={onChangeName}
                    placeholder='닉네임을 입력해주세요'
                    maxLength={20}
                    numberOfLines={1}
                />

                <View style={{ flex: 1 }} />

                <View style={styles.agreementContainer} >
                    <View style={styles.agreement} >
                        <CheckBoxToggle active={termsOfServiceAllow && privacyPolicyAllow && eventMessageAllow} onPress={onAllAllow} />
                        <UnderLineText style={{ marginLeft: 16 }} >모두 동의</UnderLineText>
                    </View>

                    <View style={styles.agreement} >
                        <CheckBoxToggle
                            active={termsOfServiceAllow}
                            onPress={() => setTermsOfServiceAllow(v => !v)}
                        />
                        <UnderLineText
                            onPress={() => setTermsOfServiceAllow(v => !v)}
                            textStyle={styles.agreementContent}
                            style={{ marginLeft: 16 }}
                        >
                            {'(필수) 서비스 이용약관에 동의합니다.'}
                        </UnderLineText>
                        <TouchableOpacity onPress={() => navigate('AgreeMent')} >
                            <BaseText style={styles.agreementDetail} >본문보기</BaseText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.agreement} >
                        <CheckBoxToggle
                            active={privacyPolicyAllow}
                            onPress={() => setPrivacyPolicyAllow(v => !v)}
                        />
                        <UnderLineText
                            onPress={() => setPrivacyPolicyAllow(v => !v)}
                            textStyle={styles.agreementContent}
                            style={{ marginLeft: 16 }}
                        >
                            {'(필수) 개인정보 수집 및 이용에 동의합니다.'}
                        </UnderLineText>
                        <TouchableOpacity onPress={() => navigate('PrivacyPolicy')} >
                            <BaseText style={styles.agreementDetail} >본문보기</BaseText>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.agreement} >
                        <CheckBoxToggle
                            active={eventMessageAllow}
                            onPress={() => setEventMessageAllow(v => !v)}
                        />
                        <UnderLineText
                            onPress={() => setEventMessageAllow(v => !v)}
                            textStyle={styles.agreementContent}
                            style={{ marginLeft: 16 }}
                        >
                            {'(선택) 이벤트/마케팅 푸시 알림 수신'}
                        </UnderLineText>
                    </View>
                </View>

            </View>
            <ButtonFooter
                active={active}
                text='다음'
                onPress={onSave}
                loading={loading}
            />
        </ScreenLayout>
    )
}

export default ProfileRegistScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16
    },
    image: {
        width: 144,
        height: 144,
        borderRadius: 72,
        alignSelf: 'center',
        marginVertical: 24,
    },
    changeContainer: {
        width: 144,
        height: 144,
        borderRadius: 72,
        alignSelf: 'center',
        marginVertical: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: VERY_LIGHT_GRAY,
    },
    change: {
        color: GRAY
    },
    agreementContainer: {
        paddingHorizontal: 16,
        marginBottom: 32
    },
    agreement: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    agreementContent: {
        color: GRAY,
        fontSize: 12
    },
    agreementDetail: {
        fontSize: 12,
        color: COLOR2,
        marginLeft: 8
    }
})
