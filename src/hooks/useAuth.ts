import { useCallback, useState } from "react"
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { useApolloClient } from "@apollo/client";
import { KakaoTokenToFirebaseTokenData, KakaoTokenToFirebaseTokenDataVars, KAKAO_TOKEN_TO_FIREBASE_TOKEN } from '../graphql/user'



const useAuth = () => {

    const client = useApolloClient()

    const [loginLoading, setLoginLoading] = useState(false)
    const [logoutLoading, setLogoutLoading] = useState(false)

    const kakaoLogin = useCallback(async () => {
        try {
            if (loginLoading) return
            setLoginLoading(true)
            console.log('get kakao access token')
            const { accessToken } = await KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
            console.log(accessToken)

            console.log('kakao token to firebase token')
            const { data } = await client.query<KakaoTokenToFirebaseTokenData, KakaoTokenToFirebaseTokenDataVars>({
                query: KAKAO_TOKEN_TO_FIREBASE_TOKEN,
                variables: { kakaoAccessToken: accessToken },
                fetchPolicy: 'network-only'
            })
            const firebaseToken = data.kakaoTokenToFirebaseToken
            console.log(firebaseToken)

            console.log('firebase login')
            await auth().signInWithCustomToken(firebaseToken)
        } catch (error) {
            console.log(error)
        } finally {
            setLoginLoading(false)
        }
    }, [loginLoading])

    const facebookLogin = useCallback(async () => {
        try {
            if (loginLoading) return
            setLoginLoading(true)

            console.log('facebook login start')
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
            if (result.isCancelled) throw new Error('Facebook Login Cancelled')

            console.log('facebook login get token')
            const token = await AccessToken.getCurrentAccessToken()
            if (!token) throw new Error('No Token')

            console.log('firebase auth')
            const facebookCredential = auth.FacebookAuthProvider.credential(token.accessToken)
            await auth().signInWithCredential(facebookCredential)
        } catch (error) {
            console.log(error)
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