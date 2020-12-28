import React, { useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import CartItemCard from '../../components/Cards/CartItemCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import ThinLine from '../../components/ThinLine'
import CartEmpty from './CartEmpty'
import CartFooter from './CartFooter'
import CartPaymentInformation from './CartPaymentInformation'
import CartSelector from './CartSelector'

const dummyCarts = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }]

const CartScreen = () => {

    const onOrder = useCallback(() => {

    }, [])

    const onSelectAll = useCallback(() => {

    }, [])

    const onRemove = useCallback(() => {

    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='장바구니' disableBtns />

            {dummyCarts.length === 0 && <CartEmpty />}
            {dummyCarts.length > 0 && <>
                <FlatList
                    data={dummyCarts}
                    renderItem={() => <CartItemCard />}
                    ListHeaderComponent={
                        <>
                            <CartSelector
                                onSelectAll={onSelectAll}
                                onRemove={onRemove}
                                totalNumber={3}
                                selectedNumber={1}
                            />
                            <ThinLine />
                        </>
                    }
                    ListFooterComponent={
                        <>
                            <ThinLine />
                            <CartPaymentInformation
                            />
                        </>
                    }
                />
                <CartFooter
                    onPress={onOrder}
                    totalPrice={159000}
                    active={true}
                />
            </>}
        </ScreenLayout>
    )
}

export default CartScreen

const styles = StyleSheet.create({})
