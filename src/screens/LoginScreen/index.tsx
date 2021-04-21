import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import BaseButton from '../../components/Buttons/BaseButton'
import useAuth from '../../hooks/useAuth'
import BaseText from '../../components/Text/BaseText'
import { APPLE_COLOR, FACEBOOK_COLOR, KAKAO_COLOR } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import appleAuth from '@invertase/react-native-apple-authentication'
import TouchableScale from '../../components/Buttons/TouchableScale'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const LoginScreen = () => {

    const { bottom } = useSafeAreaInsets()
    const { kakaoLogin, facebookLogin, appleLogin } = useAuth()

    return (
        <ScreenLayout>

            <Image
                style={styles.logo}
                source={require('../../assets/logo_background_white.png')}
                resizeMode='contain'
            />
            <View style={{ flex: 1 }} >

            </View>
            <View style={[styles.snsContainer, { marginBottom: 56 + bottom }]}  >
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
        </ScreenLayout>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    logo: {
        width: 128,
        height: 128,
        alignSelf: 'center',
        marginTop: 96
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