import { ApolloClient, createHttpLink } from '@apollo/client'
import auth from '@react-native-firebase/auth'
import { setContext } from '@apollo/client/link/context';
import { GRAPHQL_SERVER_URL } from '../../../env'
import cache from './cache'


const httpLink = createHttpLink({
    uri: GRAPHQL_SERVER_URL,
    credentials: 'include', // 쿠키를 위한 용도
})

const authLink = setContext(async (_, { headers }) => {
    // 파이어베이스에서 해당 유저의 계정 토큰을 받아서 header에 authorization 속성에 추가
    const token = await auth().currentUser?.getIdToken()
    console.log('token ' + token)
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    connectToDevTools: __DEV__ // flipper 에서 apollo client devtool 사용가능함
})