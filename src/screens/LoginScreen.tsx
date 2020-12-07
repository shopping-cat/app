import React, { useEffect } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import BaseButton from '../components/BaseButton'
import useAuth from '../hooks/useAuth'
import BaseText from '../components/BaseText'
import { useRoute } from '@react-navigation/native'
import { FACEBOOK_COLOR, KAKAO_COLOR } from '../constants/styles'


const LoginScreen = () => {

    const { params }: any = useRoute()

    const { kakaoLogin, facebookLogin, checkIsLoggedIn } = useAuth()

    useEffect(() => {
        checkIsLoggedIn(params?.id)
    }, [])

    return (
        <View style={styles.container} >
            <View style={{ flex: 1 }} >

            </View>
            <View style={styles.snsContainer}  >
                <BaseButton
                    onPress={kakaoLogin}
                    style={[styles.snsBtn, { backgroundColor: KAKAO_COLOR }]}
                >
                    <Image
                        style={styles.snsIcon}
                        source={require('../assets/kakaotalk.png')}
                        resizeMode='contain'
                    />
                    <BaseText style={{ color: '#000' }} >카카오톡으로 로그인</BaseText>
                </BaseButton>
                <BaseButton
                    onPress={facebookLogin}
                    style={[styles.snsBtn, { backgroundColor: FACEBOOK_COLOR }]}
                >
                    <Image
                        style={styles.snsIcon}
                        source={require('../assets/facebook.png')}
                        resizeMode='contain'
                    />
                    <BaseText style={{ color: '#fff' }} >페이스북으로 로그인</BaseText>
                </BaseButton>
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