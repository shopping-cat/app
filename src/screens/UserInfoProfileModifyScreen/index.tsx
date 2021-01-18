import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker';
import ButtonFooter from '../../components/ButtonFooter'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import UnderLineInput from '../../components/UnderLineInput'
import useInput from '../../hooks/useInput'

const dummyImage = 'https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_283/5-2-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg'
const dummyName = '다니엘'

const UserInfoProfileModifyScreen = () => {

    const { goBack } = useNavigation()
    const [image, setImage] = useState(dummyImage)
    const [name, onChangeName] = useInput(dummyName)

    const active = name.length > 0

    const onImage = useCallback(async () => {
        try {
            const { path } = await ImagePicker.openPicker({
                width: 512,
                height: 512,
                cropping: true,
                mediaType: 'photo',
                cropperCircleOverlay: true,
                cropperCancelText: '취소',
                loadingLabelText: '불러오는중',
                cropperChooseText: '완료'
            })
            if (!path) return
            setImage(path)
        } catch (error) {

        }
    }, [])

    const onSave = useCallback(() => {
        if (!active) return
        goBack()
    }, [active])

    return (
        <ScreenLayout>
            <DefaultHeader title='프로필' />
            <View style={styles.container} >
                <Pressable
                    onPress={onImage}
                >
                    <Image
                        style={styles.image}
                        source={{ uri: image }}
                    />
                </Pressable>
                <UnderLineInput
                    value={name}
                    onChangeText={onChangeName}
                    placeholder='이름을 입력해주세요'
                    maxLength={20}
                    numberOfLines={1}
                />
            </View>
            <ButtonFooter
                active={active}
                text='저장'
                onPress={onSave}
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

})
