/*
알림 종류 별 액션
- 리뷰작성 요청 -> 리뷰 페이지로 이동
- title & content -> 반응 없음       예) 환불실패, 환불완료
- 이벤트 -> TODO
*/
import React, { useCallback, useEffect } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import NotificationCard from '../../components/Cards/NotificationCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import CheckBoxToggle from '../../components/Toggle/CheckBoxToggle'
import { GRAY } from '../../constants/styles'
import messaging from '@react-native-firebase/messaging';
import { useNotifications } from '../../graphql/notification'
import LoadingView from '../../components/View/LoadingView'
import { I_USER, useUpdateEventMessageAllow } from '../../graphql/user'
import { useApolloClient } from '@apollo/client'
import EmptyView from '../../components/View/EmptyView'
import useToast from '../../hooks/useToast'
import dateFormat from '../../lib/dateFormat'


const NotificationScreen = () => {

    const client = useApolloClient()
    const { data, loading, fetchMore } = useNotifications({ fetchPolicy: 'network-only', nextFetchPolicy: 'cache-only' })
    const { show } = useToast()
    const [updateEventMessageAllow] = useUpdateEventMessageAllow()

    useEffect(() => {
        messaging().requestPermission()
    }, [])

    useEffect(() => {
        if (loading) return
        client.query({ query: I_USER, fetchPolicy: 'network-only' })
    }, [loading])

    const onMessageAllow = useCallback(async () => {
        if (!data) return
        const { errors } = await updateEventMessageAllow({ variables: { allow: !data.iUser.eventMessageAllowDate } })
        if (errors) return
        if (!data.iUser.eventMessageAllowDate) show(`${dateFormat(new Date())}에 모바일 앱 이벤트/마케팅\n 푸시 알림 수신 동의 처리되었습니다.`, 5000)
        else show(`${dateFormat(new Date())}에 모바일 앱 이벤트/마케팅\n 푸시 알림 수신 거부 처리되었습니다.`, 5000)
    }, [data])

    return (
        <ScreenLayout>
            <DefaultHeader title='알림' disableBtns />
            {loading && <LoadingView />}
            {data && <FlatList
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                data={data.notifications}
                onEndReached={() => fetchMore({ variables: { offset: data.notifications.length } })}
                renderItem={({ item }) => <NotificationCard {...item} />}
                ListHeaderComponent={
                    <Pressable
                        onPress={onMessageAllow}
                        style={styles.headerContainer}
                    >
                        <CheckBoxToggle
                            onPress={onMessageAllow}
                            active={!!data.iUser.eventMessageAllowDate}
                        />
                        <BaseText style={styles.pushAgree} >이벤트/마케팅 푸시 알림 수신</BaseText>
                    </Pressable>
                }
            />}
            {data?.notifications.length === 0 && <EmptyView />}
        </ScreenLayout>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    pushAgree: {
        color: GRAY,
        marginLeft: 16
    }
})