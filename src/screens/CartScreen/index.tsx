import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ButtonFooter from '../../components/ButtonFooter'
import CartItemCard from '../../components/Cards/CartItemCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import ThinLine from '../../components/ThinLine'
import { ID } from '../../constants/types'
import { deleteCartItemsFromCache, useCartItems, useDeleteCartItems } from '../../graphql/cartItem'
import useRefreshing from '../../hooks/useRefreshing'
import moneyFormat from '../../lib/moneyFormat'
import CartEmpty from './CartEmpty'
import CartPaymentInformation from './CartPaymentInformation'
import CartScreenSkeleton from './CartScreenSkeleton'
import CartSelector from './CartSelector'

const CartScreen = () => {

    const { navigate } = useNavigation()
    const [deleteCartItems, { loading: deleteCartItemsLoading }] = useDeleteCartItems()
    const { data, refetch } = useCartItems()
    const { onRefresh, refreshing } = useRefreshing(refetch)

    const [selectList, setSelectList] = useState<ID[]>(data?.cartItems.map(v => v.id) || [])

    const active = selectList.length > 0


    const onSelectAll = useCallback(() => {
        if (selectList.length === data?.cartItems.length) setSelectList([])
        else setSelectList(data?.cartItems.map(v => v.id) || [])
    }, [selectList, data])

    const onDeleteSelect = useCallback(async () => { // 선택 삭제
        if (selectList.length === 0) return
        if (deleteCartItemsLoading) return
        try {
            // UI 먼저 처리
            deleteCartItemsFromCache(selectList)
            setSelectList([])
            // 서버에도 적용
            await deleteCartItems({ variables: { itemIds: selectList } })
        } catch (error) {
            console.error(error)
        }
    }, [selectList, deleteCartItemsLoading, deleteCartItems])

    const onDeleteItem = useCallback(async (id: ID) => { // 아이템 삭제
        if (deleteCartItemsLoading) return
        try {
            // UI 먼저 처리
            deleteCartItemsFromCache([id])
            setSelectList(selectList.filter(v => v !== id))
            // 서버에도 적용
            await deleteCartItems({ variables: { itemIds: [id] } })
        } catch (error) {
            console.error(error)
        }
    }, [deleteCartItemsLoading, selectList, deleteCartItems])

    const onSelectItem = useCallback((id: ID) => {
        if (selectList.includes(id)) setSelectList(selectList.filter(v => v !== id))
        else setSelectList([...selectList, id])
    }, [selectList])

    const onPayment = useCallback(() => {
        navigate('Payment')
    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='장바구니' disableBtns />
            {!data && <CartScreenSkeleton />}
            {data && data.cartItems.length === 0 && <CartEmpty />}
            {data && data.cartItems.length > 0 && <>
                <FlatList
                    onRefresh={onRefresh}
                    refreshing={refreshing}
                    data={data.cartItems}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) =>
                        <CartItemCard
                            data={item}
                            selected={selectList.includes(item.id)}
                            onDelete={onDeleteItem}
                            onSelect={onSelectItem}
                        />
                    }
                    ListHeaderComponent={
                        <>
                            <CartSelector
                                onSelectAll={onSelectAll}
                                onRemove={onDeleteSelect}
                                totalNumber={data.cartItems.length}
                                selectedNumber={selectList.length}
                            />
                            <ThinLine />
                        </>
                    }
                    ListFooterComponent={
                        data && <>
                            <ThinLine />
                            <CartPaymentInformation
                                data={data.cartItems}
                                selectList={selectList}
                            />
                        </>
                    }
                />
                <ButtonFooter
                    active={active}
                    onPress={onPayment}
                    text={`${active ? moneyFormat(156900) + '원 ' : ''}주문하기`}
                />
            </>}
        </ScreenLayout>
    )
}

export default CartScreen

const styles = StyleSheet.create({})
