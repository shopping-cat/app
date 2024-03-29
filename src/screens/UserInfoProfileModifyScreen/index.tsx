import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import ImagePicker, { Image as ImageFile } from 'react-native-image-crop-picker';
import BaseText from '../../components/Text/BaseText';
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import UnderLineInput from '../../components/Input/UnderLineInput'
import { useIUser, useUpdateUserProfile } from '../../graphql/user';
import useInput from '../../hooks/useInput'
import generateImageToRNFile from '../../lib/generateRNFile';


const UserInfoProfileModifyScreen = () => {

    const { goBack } = useNavigation()

    const { data } = useIUser()
    const [updateUserProfile, { loading }] = useUpdateUserProfile()

    const [image, setImage] = useState<ImageFile | null>(null)
    const [name, onChangeName] = useInput(data?.iUser.name || '')

    const active = name.length > 0

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
            await updateUserProfile({
                variables: {
                    name,
                    photo: file
                }
            })
            goBack()
        } catch (error) {
            console.error(error)
        }
    }, [active, name, image, loading])

    return (
        <ScreenLayout>
            <DefaultHeader title='프로필' disableBtns />
            <View style={styles.container} >
                <Pressable
                    onPress={onImage}
                >
                    <Image
                        style={styles.image}
                        source={{ uri: image?.path || data?.iUser.photo }}
                    />
                    <View style={styles.changeContainer} >
                        <BaseText style={styles.change} >변경</BaseText>
                    </View>
                </Pressable>
                <UnderLineInput
                    value={name}
                    onChangeText={onChangeName}
                    placeholder='닉네임을 입력해주세요'
                    maxLength={20}
                    numberOfLines={1}
                />
            </View>
            <ButtonFooter
                active={active}
                text='저장'
                onPress={onSave}
                loading={loading}
            />
        </ScreenLayout>
    )
}

export default UserInfoProfileModifyScreen

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
        position: 'absolute',
        width: 144,
        height: 144,
        borderRadius: 72,
        alignSelf: 'center',
        marginVertical: 24,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    change: {
        color: '#fff'
    }
})
