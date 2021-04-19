/*
알림 종류 별 액션
- 리뷰작성 요청 -> 리뷰 페이지로 이동
- title & content -> 반응 없음       예) 환불실패, 환불완료
- 이벤트 -> TODO
*/
import React, { useCallback, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import NotificationCard from '../../components/Cards/NotificationCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import CheckBoxToggle from '../../components/Toggle/CheckBoxToggle'
import { GRAY } from '../../constants/styles'
import messaging from '@react-native-firebase/messaging';

const dummyData = [
    {
        id: 1,
        title: '리뷰 작성',
        content: '최근 구매하신 딱해먹 고양이 구름다리 벽걸이 캣타워 상품에 대한 리뷰를 작성해 주세요',
        date: '2020.05.18',
        image: 'https://lh3.googleusercontent.com/proxy/Fvmy5aju8Ad7Ns1FD5eav6OP34NSxMOPgupmWw7ANLN0muqT_92RO7As9n3FCUdBRgELc4ynBnieiV9xZKeu7dKY9EtWhX9uqCwOceKip1zMh2_6JzI',
        checked: true,
        type: 'review'
    },
    {
        id: 2,
        title: '환불실패',
        content: '사유가 적당하지 않아서 환불 실패되었습니다',
        date: '2020.05.18',
        image: null,
        checked: true,
        type: 'none'
    },
    {
        id: 3,
        title: '리뷰 작성',
        content: '최근 구매하신 딱해먹 고양이 구름다리 벽걸이 캣타워 상품에 대한 리뷰를 작성해 주세요',
        date: '2020.05.18',
        image: 'https://lh3.googleusercontent.com/proxy/Fvmy5aju8Ad7Ns1FD5eav6OP34NSxMOPgupmWw7ANLN0muqT_92RO7As9n3FCUdBRgELc4ynBnieiV9xZKeu7dKY9EtWhX9uqCwOceKip1zMh2_6JzI',
        checked: true,
        type: 'review'
    },
    {
        id: 4,
        title: '환불실패',
        content: '사유가 적당하지 않아서 환불 실패되었습니다',
        date: '2020.05.18',
        image: null,
        checked: true,
        type: 'none'
    }
]

const NotificationScreen = () => {

    useEffect(() => {
        messaging().requestPermission()
    }, [])

    const onPushagree = useCallback(() => {

    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='알림' disableBtns />
            <FlatList
                showsVerticalScrollIndicator={false}
                overScrollMode='never'
                data={dummyData}
                renderItem={({ item }) => <NotificationCard {...item} />}
                ListHeaderComponent={
                    <View style={styles.headerContainer} >
                        <CheckBoxToggle
                            onPress={onPushagree}
                            active={true}
                        />
                        <BaseText style={styles.pushAgree} >이벤트/마케팅 푸시 알림 수신</BaseText>
                    </View>
                }
            />
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