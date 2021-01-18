import React, { useCallback, useState } from 'react'
import { FlatList, KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import ButtonFooter from '../../components/ButtonFooter'
import CouponCard from '../../components/Cards/CouponCard'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import { IS_IOS } from '../../constants/values'
import CouponRegistBottomSheet from '../../components/BottomSheets/CouponRegistBottomSheet'

const dummyCoupons = Array(20).fill({}).map((_, i) => ({ id: i.toString() }))

const CouponScreen = () => {

    const [couponRegistBottomSheetVisible, setCouponRegistBottomSheetVisible] = useState(false)

    const onCouponRegist = useCallback((code: string) => {

    }, [])

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
                        data={dummyCoupons}
                        renderItem={() => <CouponCard />}
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