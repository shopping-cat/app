import React, { useCallback, useState } from 'react'
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import ButtonFooter from '../../components/ButtonFooter'
import CouponCard, { CouponCardSkeleton } from '../../components/Cards/CouponCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import { IS_IOS } from '../../constants/values'
import CouponRegistBottomSheet from '../../components/BottomSheets/CouponRegistBottomSheet'
import { useCoupons, useRegistCoupon } from '../../graphql/coupon'
import SafeAreaFooterHeightView from '../../components/SafeAreaFooterHeightView'
import makeIdArray from '../../lib/makeIdArray'


const CouponScreen = () => {
    // UI
    const [couponRegistBottomSheetVisible, setCouponRegistBottomSheetVisible] = useState(false)
    // DATA
    const { data, loading, fetchMore, refetch } = useCoupons({ fetchPolicy: 'network-only' })
    const [registCoupon, { loading: registLoading }] = useRegistCoupon()

    const onCouponRegist = useCallback(async (code: string) => {
        try {
            if (registLoading) return
            await registCoupon({
                variables: { couponId: code }
            })
            await refetch()
        } catch (error) {
            console.error(error)
        } finally {
            setCouponRegistBottomSheetVisible(false)
        }
    }, [registLoading, refetch, registCoupon])

    return (
        <ScreenLayout disableStatusbarHeight >
            <KeyboardAvoidingView
                style={styles.keyboardAvoidingView}
                behavior='padding'
                enabled={IS_IOS}
            >
                <View style={{ flex: 1 }} >
                    <StatusBarHeightView />
                    <DefaultHeader title='쿠폰' disableBtns />
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        onEndReached={() => fetchMore({
                            variables: { offset: data?.coupons.length }
                        })}
                        onEndReachedThreshold={0.4}
                        overScrollMode='never'
                        data={loading ? makeIdArray(8, true) : data?.coupons as any}
                        renderItem={({ item }) => loading ? <CouponCardSkeleton /> : <CouponCard {...item} />}
                    />
                    <ButtonFooter
                        active
                        onPress={() => setCouponRegistBottomSheetVisible(true)}
                        text='쿠폰 등록'
                    />
                    <CouponRegistBottomSheet
                        visible={couponRegistBottomSheetVisible}
                        onClose={() => setCouponRegistBottomSheetVisible(false)}
                        onRegist={onCouponRegist}
                        loading={registLoading}
                    />
                </View>
            </KeyboardAvoidingView>

        </ScreenLayout>
    )
}

export default CouponScreen

const styles = StyleSheet.create({
    keyboardAvoidingView: {
        flex: 1
    }
})