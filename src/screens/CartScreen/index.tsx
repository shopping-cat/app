import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ButtonFooter from '../../components/ButtonFooter'
import CartItemCard from '../../components/Cards/CartItemCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import ThinLine from '../../components/ThinLine'
import { ID } from '../../constants/types'
import moneyFormat from '../../lib/moneyFormat'
import CartEmpty from './CartEmpty'
import CartPaymentInformation from './CartPaymentInformation'
import CartSelector from './CartSelector'

const dummyCarts = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }, { id: '6' }]

const active = true

const CartScreen = () => {

    const { navigate } = useNavigation()

    const onSelectAll = useCallback(() => {

    }, [])

    const onRemove = useCallback(() => {

    }, [])

    const onDeleteItem = useCallback((id: ID) => {

    }, [])

    const onSelectItem = useCallback((id: ID) => {

    }, [])

    const onOrder = useCallback(() => {
        navigate('Payment')
    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='장바구니' disableBtns />

            {dummyCarts.length === 0 && <CartEmpty />}
            {dummyCarts.length > 0 && <>
                <FlatList
                    data={dummyCarts}
                    renderItem={() =>
                        <CartItemCard
                            selected={true}
                            onDelete={onDeleteItem}
                            onSelect={onSelectItem}
                        />
                    }
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
                <ButtonFooter
                    active={active}
                    onPress={onOrder}
                    text={`${active ? moneyFormat(156900) + '원 ' : ''}주문하기`}
                />
            </>}
        </ScreenLayout>
    )
}

export default CartScreen

const styles = StyleSheet.create({})
