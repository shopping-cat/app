import React, { useCallback, useEffect, useRef } from 'react'
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { HEIGHT, LIGHT_GRAY } from '../../constants/styles'
import { Coupon } from '../../graphql/order'
import CouponSelectSheetCard from '../Cards/CouponSelectSheetCard'
import BottomSheet from './BottomSheet'

interface CouponSelectBottomSheetProps {
    list: Coupon[]
    onSelect: (index: number) => void
    visible: boolean
    onClose: () => void
}

const CouponSelectBottomSheet: React.FC<CouponSelectBottomSheetProps> = ({ list, onClose, onSelect, visible }) => {

    const { bottom } = useSafeAreaInsets()

    const flatlistRef = useRef<FlatList>(null)

    useEffect(() => {
        if (visible) flatlistRef.current?.scrollToOffset({ offset: 0, animated: false })
    }, [visible])

    const onPress = useCallback((index: number) => {
        onSelect(index)
        onClose()
    }, [])

    return (
        <BottomSheet
            visible={visible}
            onClose={onClose}
            draggAbleHeaderRender={() =>
                <View style={styles.swipeHandleConatiner} >
                    <View style={styles.swipeHandle} />
                </View>
            }
            render={() =>
                <FlatList
                    ref={flatlistRef}
                    data={list}
                    renderItem={({ item, index }) => <CouponSelectSheetCard data={item} onPress={() => onPress(index)} />}
                    style={[styles.flatlist, { height: HEIGHT * 0.7 }]}
                    overScrollMode='never'
                    ListFooterComponent={<View style={{ height: bottom }} />}
                />
            }
        />
    )
}

export default CouponSelectBottomSheet

const styles = StyleSheet.create({
    swipeHandleConatiner: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
        height: 25,
        marginBottom: -1, // container랑 겹치기 위해서
        alignItems: 'center',
        paddingTop: 16,
        backgroundColor: '#fff'
    },
    swipeHandle: {
        width: 48,
        height: 4,
        borderRadius: 2,
        backgroundColor: LIGHT_GRAY
    },
    flatlist: {
        backgroundColor: '#fff',
    },
    itemContainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between'
    }
})
