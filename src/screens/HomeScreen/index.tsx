import React, { useCallback, useEffect, useRef, useState } from 'react'
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Animated, View, FlatList, Linking } from 'react-native'
import HomeHeader from '../../components/Headers/HomeHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import UpFab from '../../components/Buttons/UpFab'
import { STATUSBAR_HEIGHT, WIDTH } from '../../constants/styles'
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging'
import BestTab from './HomeScreenTabs/BestTab'
import HomeTab from './HomeScreenTabs/HomeTab'
import NewTab from './HomeScreenTabs/NewTab'
import HomeScreenTabSelector from './HomeScreenTabSelector'
import { useNavigation } from '@react-navigation/core'
import useToast from '../../hooks/useToast'
import { I_USER, useUpdateFcmToken } from '../../graphql/user'
import { useApolloClient } from '@apollo/client'
import useAuth from '../../hooks/useAuth'
import auth from '@react-native-firebase/auth';

const HomeScreen = () => {

    const { navigate } = useNavigation()

    const scrollViewRef = useRef<ScrollView>(null)
    const homeFlatlistRef = useRef<FlatList>(null)
    const bestFlatlistRef = useRef<FlatList>(null)
    const newFlatlistRef = useRef<FlatList>(null)

    const [tabIndex, setTabIndex] = useState(0)
    const [scrollX] = useState(new Animated.Value(0))
    const { show } = useToast()
    const client = useApolloClient()
    const [updateFcmToken] = useUpdateFcmToken()
    const { loginLoading } = useAuth()

    const onTabSelectorPress = useCallback((index: number) => { // 셀렉터 버튼 클릭시
        scrollViewRef.current?.scrollTo({ animated: true, x: WIDTH * index })
    }, [])

    const goUp = useCallback(() => {
        if (tabIndex === 0) homeFlatlistRef.current?.scrollToOffset({ offset: 0, animated: true })
        if (tabIndex === 1) bestFlatlistRef.current?.scrollToOffset({ offset: 0, animated: true })
        if (tabIndex === 2) newFlatlistRef.current?.scrollToOffset({ offset: 0, animated: true })
    }, [tabIndex])

    const deepLinking = useCallback(async (url: string | null) => {
        try {
            if (!url) return
            const splitedUrl = url.split('/')
            const screen = splitedUrl[splitedUrl.length - 2]
            if (screen !== 'item') return
            const itemId = splitedUrl[splitedUrl.length - 1]
            navigate('ItemDetail', { id: Number(itemId) })
        } catch (error) { }
    }, [])

    useEffect(() => {
        // shoppingcat://item/23
        Linking.getInitialURL().then(url => deepLinking(url))
        const listner = Linking.addEventListener('url', ({ url }) => deepLinking(url))
        return listner
    }, [])



    const onMessage = async (message: FirebaseMessagingTypes.RemoteMessage) => {
        if (message.notification?.title) {
            await client.query({ query: I_USER, fetchPolicy: 'network-only', }) // 알림 ui 적용 때문에 사용
            show(message.notification.title + '\n\n자세한 내용은 알림을 확인해주세요')
        }
    }

    // foreground push listner
    useEffect(() => {
        const unsubscribe = messaging().onMessage(onMessage)
        return unsubscribe
    }, [])

    // background push listner
    useEffect(() => {
        // 푸시를 눌러서 열었을때 IOS는 백그라운드, QUIT상태 둘다 onNotificationOpendApp이 작동함
        // 안드로이드는 백그라운드 상태에서만 onNotificationOpendApp이 작동해서 푸시 눌러서 앱 초기 실행할때는 messaging().getInitialNotification() 로 처리해주세요
        messaging().onNotificationOpenedApp(async remoteMessage => {
            if (remoteMessage.data?.type === 'notification') {
                navigate('Notification')
            }
        })
        // android quit push listner
        // Android Only ios는 언제나 null
        // 트리거 형식이라 한번만 작동함
        messaging().getInitialNotification().then((remoteMessage) => {
            if (!remoteMessage) return
            navigate('Notification')
        })
    }, [])


    const fcmInit = async () => {
        await messaging().requestPermission()
        const token = await messaging().getToken()
        await updateFcmToken({ variables: { token } })
    }

    const fcmRefresh = async (token: string) => {
        await updateFcmToken({ variables: { token } })
    }

    // fcm token listner
    useEffect(() => {
        if (!auth().currentUser) return
        fcmInit()
        return messaging().onTokenRefresh(fcmRefresh)
    }, [loginLoading])


    return (
        <ScreenLayout >
            <HomeHeader />
            <HomeScreenTabSelector
                scrollX={scrollX}
                tabIndex={tabIndex}
                onPress={onTabSelectorPress}
            />
            <Animated.ScrollView
                ref={scrollViewRef}
                scrollEventThrottle={16}
                horizontal
                overScrollMode='never'
                pagingEnabled
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: true,
                        listener: ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
                            setTabIndex(Math.round(nativeEvent.contentOffset.x / WIDTH))
                        }
                    }
                )}
                showsHorizontalScrollIndicator={false}
            >
                <HomeTab ref={homeFlatlistRef} />
                <BestTab ref={bestFlatlistRef} />
                <NewTab ref={newFlatlistRef} />
            </Animated.ScrollView>
            <UpFab onPress={goUp} />
        </ScreenLayout>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

})
