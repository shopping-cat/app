import { useCallback, useState } from "react"
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { useApolloClient } from "@apollo/client";
import { KakaoTokenToFirebaseTokenData, KakaoTokenToFirebaseTokenDataVars, KAKAO_TOKEN_TO_FIREBASE_TOKEN } from '../graphql/user'
import useToast from "./useToast";



const useAuth = () => {

    const client = useApolloClient()

    const [loginLoading, setLoginLoading] = useState(false)
    const [logoutLoading, setLogoutLoading] = useState(false)
    const { show } = useToast()

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
        } catch (error) {
            console.log(error)
            show(error.message)
        } finally {
            setLoginLoading(false)
        }
    }, [loginLoading, show])

    const facebookLogin = useCallback(async () => {
        try {
            if (loginLoading) return
            setLoginLoading(true)

            const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
            if (result.isCancelled) throw new Error('Facebook Login Cancelled')

            const token = await AccessToken.getCurrentAccessToken()
            if (!token) throw new Error('No Token')

            const facebookCredential = auth.FacebookAuthProvider.credential(token.accessToken)
            await auth().signInWithCredential(facebookCredential)
        } catch (error) {
            console.log(error)
            show(error.message)
        } finally {
            setLoginLoading(false)
        }
    }, [loginLoading])

    const appleLogin = useCallback(async () => {
        try {
            if (loginLoading) return
            setLoginLoading(true)

            const { identityToken } = await appleAuth.performRequest()
            console.log(identityToken)
        } catch (error) {
            console.log(error)
            show(error.message)
        } finally {
            setLoginLoading(false)
        }
    }, [loginLoading])


    const logout = useCallback(async () => {
        try {
            if (logoutLoading) return
            setLogoutLoading(true)
            console.log('logout start')
            await auth().signOut()
        } catch (error) {
            console.log(error)
            show(error.message)
        } finally {
            setLogoutLoading(false)
        }
    }, [logoutLoading])


    return {
        kakaoLogin,
        facebookLogin,
        appleLogin,
        logout
    }
}

export default useAuth