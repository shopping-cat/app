import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import OrderCard from '../../components/Cards/OrderCard'

const dummyData = [
    {
        id: 15230,
        date: '2020.05.25',
        name: '딱해먹 고양이 구름다리 벽걸이 캣타워 외 5개',
        state: '구매접수'
    },
    {
        id: 15230,
        date: '2020.05.25',
        name: '딱해먹 고양이 구름다리 벽걸이 캣타워 외 5개',
        state: '취소처리'
    },
    {
        id: 15230,
        date: '2020.05.25',
        name: '딱해먹 고양이 구름다리 벽걸이 캣타워 외 5개',
        state: '배송중'
    },
    {
        id: 15230,
        date: '2020.05.25',
        name: '딱해먹 고양이 구름다리 벽걸이 캣타워 외 5개',
        state: '환불중'
    },
    {
        id: 15230,
        date: '2020.05.25',
        name: '딱해먹 고양이 구름다리 벽걸이 캣타워 외 5개',
        state: '교환처리'
    }
]

const OrderScreen = () => {
    return (
        <ScreenLayout>
            <DefaultHeader title='주문내역' disableBtns />
            <FlatList
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                data={dummyData}
                renderItem={({ item }) => <OrderCard {...item} />}
            />
        </ScreenLayout>
    )
}

export default OrderScreen

const styles = StyleSheet.create({})
