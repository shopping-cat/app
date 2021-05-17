import React, { useEffect } from 'react'
import { ActivityIndicator, Image, Modal, StyleSheet, View } from 'react-native'
import BaseButton from '../../components/Buttons/BaseButton'
import useAuth from '../../hooks/useAuth'
import BaseText from '../../components/Text/BaseText'
import { APPLE_COLOR, FACEBOOK_COLOR, KAKAO_COLOR, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import appleAuth from '@invertase/react-native-apple-authentication'
import TouchableScale from '../../components/Buttons/TouchableScale'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialIcons'
import StatusBarHeightView from '../../components/View/StatusBarHeightView'
import useLoadingModal from '../../hooks/useLoadingModal'
import DefaultHeader from '../../components/Headers/DefaultHeader'


const LoginScreen = () => {

    const { bottom } = useSafeAreaInsets()
    const { kakaoLogin, facebookLogin, appleLogin, loginLoading } = useAuth()
    const { open, close } = useLoadingModal()

    useEffect(() => {
        if (loginLoading) open()
        else close()
    }, [loginLoading])

    useEffect(() => {
        return close
    }, [])

    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <DefaultHeader disableBtns underLine={false} />
            <View style={[styles.container, { paddingBottom: 56 + bottom }]} >
                <Icon name='login' color={VERY_LIGHT_GRAY} size={100} />

                <BaseText style={styles.title} >로그인이 필요해요</BaseText>
                <BaseText style={styles.content} >13초 만에 회원가입 할 수 있어요</BaseText>

                <View style={[styles.snsContainer]}  >
                    <TouchableScale
                        onPress={kakaoLogin}
                        style={[styles.snsBtn, { backgroundColor: KAKAO_COLOR }]}
                    >
                        <Image
                            style={styles.snsIcon}
                            source={require('../../assets/kakaotalk.png')}
                            resizeMode='contain'
                        />
                    </TouchableScale>
                    <TouchableScale
                        onPress={facebookLogin}
                        style={[styles.snsBtn, { backgroundColor: FACEBOOK_COLOR }]}
                    >
                        <Image
                            style={styles.snsIcon}
                            source={require('../../assets/facebook.png')}
                            resizeMode='contain'
                        />
                    </TouchableScale>
                    {IS_IOS && appleAuth.isSupported && <TouchableScale
                        onPress={appleLogin}
                        style={[styles.snsBtn, { backgroundColor: APPLE_COLOR }]}
                    >
                        <Image
                            style={styles.snsIcon}
                            source={require('../../assets/apple.png')}
                            resizeMode='contain'
                        />
                    </TouchableScale>}
                </View>

            </View>
        </ScreenLayout>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        fontSize: 20,
        marginTop: 24,
        marginBottom: 24
    },
    content: {
        fontSize: 16,
        color: LIGHT_GRAY,
        marginBottom: 32,
    },
    snsContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    snsBtn: {
        marginHorizontal: 12,
        height: 56,
        width: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center'
    },
    snsIcon: {
        width: 24,
        height: 24
    }
})