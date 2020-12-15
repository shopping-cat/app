import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import BaseButton from '../../components/Buttons/BaseButton'
import useAuth from '../../hooks/useAuth'
import BaseText from '../../components/BaseText'
import { APPLE_COLOR, FACEBOOK_COLOR, KAKAO_COLOR } from '../../constants/styles'
import { IS_IOS } from '../../constants/values'
import appleAuth from '@invertase/react-native-apple-authentication'
import TouchableScale from '../../components/Buttons/TouchableScale'


const LoginScreen = () => {

    const { kakaoLogin, facebookLogin, appleLogin } = useAuth()

    return (
        <View style={styles.container} >
            <View style={{ flex: 1 }} >

            </View>
            <View style={styles.snsContainer}  >
                <TouchableScale
                    onPress={kakaoLogin}
                    style={[styles.snsBtn, { backgroundColor: KAKAO_COLOR }]}
                >
                    <Image
                        style={styles.snsIcon}
                        source={require('../../assets/kakaotalk.png')}
                        resizeMode='contain'
                    />
                    <BaseText style={{ color: '#000' }} >카카오톡으로 로그인</BaseText>
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
                    <BaseText style={{ color: '#fff' }} >페이스북으로 로그인</BaseText>
                </TouchableScale>
                {IS_IOS && appleAuth.isSupported && <BaseButton
                    onPress={appleLogin}
                    style={[styles.snsBtn, { backgroundColor: APPLE_COLOR }]}
                >
                    <Image
                        style={styles.snsIcon}
                        source={require('../../assets/apple.png')}
                        resizeMode='contain'
                    />
                    <BaseText style={{ color: '#fff' }} >애플로 로그인</BaseText>
                </BaseButton>}
            </View>
        </View>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    snsContainer: {
        alignItems: 'flex-start'
    },
    snsBtn: {
        marginLeft: 16,
        paddingHorizontal: 24,
        height: 56,
        borderRadius: 28,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        overflow: 'hidden'
    },
    snsIcon: {
        width: 24,
        height: 24,
        marginRight: 24
    }
})