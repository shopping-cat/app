import { useApolloClient } from "@apollo/client"
import { StackActions, useNavigation } from "@react-navigation/native"
import { useCallback, useState } from "react"
import KakaoLogins, { KAKAO_AUTH_TYPES } from '@react-native-seoul/kakao-login';
import { LoginManager, AccessToken } from "react-native-fbsdk";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import { I_USER } from "../graphql/auth"

const useAuth = () => {

    const client = useApolloClient()
    const { dispatch, reset } = useNavigation()
    const [itemId, setItemId] = useState<string | undefined>()

    const checkIsLoggedIn = useCallback(async (itemId?: string) => {
        try {
            setItemId(itemId)
            const { data } = await client.query({ query: I_USER, fetchPolicy: 'network-only' })
            if (data) {
                if (itemId) reset({ index: 1, routes: [{ name: 'Tab' }, { name: 'ItemDetail', params: { itemId } }] })
                else dispatch(StackActions.replace('Tab'))
            }
        } catch (error) {
            console.log(error)
        }
    }, [])

    const kakaoLogin = useCallback(async () => {
        try {
            console.log('kakao login start')
            const token = await KakaoLogins.login([KAKAO_AUTH_TYPES.Talk, KAKAO_AUTH_TYPES.Account])
            console.log('kakao login got tokend')
            KakaoLogins.getTokens()
            // const { errors } = await kakaoLoginRequest({ variables: { token: token.accessToken } })
        } catch (error) {
            console.log(error)
        }
    }, [itemId])

    const facebookLogin = useCallback(async () => {
        try {
            console.log('facebook login start')
            const result = await LoginManager.logInWithPermissions(['public_profile', 'email'])
            if (result.isCancelled) throw new Error('Facebook Login Cancelled')

            console.log('facebook login get token')
            const token = await AccessToken.getCurrentAccessToken()
            if (!token) throw new Error('No Token')

            console.log('firebase auth')
            const facebookCredential = auth.FacebookAuthProvider.credential(token.accessToken)
            auth().signInWithCredential(facebookCredential)
        } catch (error) {
            console.log(error)
        }
    }, [itemId])

    const appleLogin = useCallback(async () => {
        try {
            const { identityToken } = await appleAuth.performRequest()
            console.log(identityToken)
        } catch (error) {
            console.log(error)
        }
    }, [itemId])


    const logout = useCallback(async () => {
        try {
            console.log('logout start')
            await auth().signOut()
        } catch (error) {
            console.log(error)
        }
    }, [])


    return {
        checkIsLoggedIn,
        kakaoLogin,
        facebookLogin,
        appleLogin,
        logout
    }
}

export default useAuth