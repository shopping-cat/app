import { useCallback, useState } from "react"
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { makeVar, useApolloClient, useReactiveVar } from "@apollo/client";
import { I_USER, KakaoTokenToFirebaseTokenData, KakaoTokenToFirebaseTokenDataVars, KAKAO_TOKEN_TO_FIREBASE_TOKEN, LoginData } from '../graphql/user'
import messaging from '@react-native-firebase/messaging'
import useToast from "./useToast";
import { useNavigation } from "@react-navigation/core";


const loginLoadingVar = makeVar<boolean>(false)

const useAuth = () => {

    const client = useApolloClient()

    const loginLoading = useReactiveVar(loginLoadingVar)
    const isLoggedIn = !!auth().currentUser

    const [logoutLoading, setLogoutLoading] = useState(false)
    const { show } = useToast()
    const { reset } = useNavigation()

    const kakaoLogin = useCallback(async () => {
        try {
            if (loginLoading) return
            setLoginLoading(true)
            const { accessToken } = await KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])

            const { data } = await client.query<KakaoTokenToFirebaseTokenData, KakaoTokenToFirebaseTokenDataVars>({
                query: KAKAO_TOKEN_TO_FIREBASE_TOKEN,
                variables: { kakaoAccessToken: accessToken },
                fetchPolicy: 'network-only'
            })
            const firebaseToken = data.kakaoTokenToFirebaseToken
            await auth().signInWithCustomToken(firebaseToken)

            await loginSuccess()
        } catch (error) {
            console.log(error)
            show(error.message)
            setLoginLoading(false)
        }
    }, [loginLoading])

    const facebookLogin = useCallback(async () => {
        try {
            if (loginLoading) return
            setLoginLoading(true)

            const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
            if (result.isCancelled) throw new Error('Facebook Login Canceled')

            const token = await AccessToken.getCurrentAccessToken()
            if (!token) throw new Error('No Token')

            const facebookCredential = auth.FacebookAuthProvider.credential(token.accessToken)
            await auth().signInWithCredential(facebookCredential)

            await loginSuccess()
        } catch (error) {
            console.log(error)
            show(error.message)
            setLoginLoading(false)
        }
    }, [loginLoading])

    const appleLogin = useCallback(async () => {
        try {
            if (loginLoading) return
            setLoginLoading(true)

            const { identityToken, nonce } = await appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL]
            })
            if (!identityToken) throw new Error('Apple Login Fail')
            console.log('token : ' + identityToken)

            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce)
            console.log('credential : ' + appleCredential)
            await auth().signInWithCredential(appleCredential)

            await loginSuccess()
        } catch (error) {
            console.log(error)
            show(error.message)
            setLoginLoading(false)
        }
    }, [loginLoading])

    const loginSuccess = useCallback(async () => {
        try {
            await client.clearStore()

            const { data } = await client.query<LoginData>({ query: I_USER, fetchPolicy: 'network-only', })
            if (!data.iUser.name) reset({ index: 0, routes: [{ name: 'ProfileRegist' }] })  // 이름정보가 없으면 기본정보입력화면으로 전환
            else reset({ index: 0, routes: [{ name: 'Tab' }] })

            setLoginLoading(false)
        } catch (error) {
            console.log(error)
            setLoginLoading(false)
        }
    }, [])


    const logout = useCallback(async () => {
        try {
            if (logoutLoading) return
            setLogoutLoading(true)
            console.log('logout start')
            await messaging().deleteToken()
            await auth().signOut()

            await client.clearStore()
            reset({ index: 0, routes: [{ name: 'Tab' }] })
        } catch (error) {
            console.log(error)
            show(error.message)
        } finally {
            setLogoutLoading(false)
        }
    }, [logoutLoading])

    const setLoginLoading = useCallback((v: boolean) => {
        loginLoadingVar(v)
    }, [])


    return {
        kakaoLogin,
        facebookLogin,
        appleLogin,
        logout,
        isLoggedIn,
        loginLoading,
        setLoginLoading
    }
}

export default useAuth