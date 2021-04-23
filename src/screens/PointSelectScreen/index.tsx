import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import BaseText, { baseTextStyle } from '../../components/Text/BaseText'
import ButtonFooter from '../../components/Layouts/ButtonFooter'
import BorderyButton from '../../components/Buttons/BorderyButton'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import ThinLine from '../../components/View/ThinLine'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { OrderCalculate } from '../../graphql/order'
import useCouponPoint from '../../hooks/useCouponPoint'
import moneyFormat from '../../lib/moneyFormat'

const NOTI = `부분적으로 환불/취소 하실시 포인트보다 결제하신 금액이 우선적으로 환불됩니다.`

export interface PointSelectScreenProps {
    data: OrderCalculate
}

const PointSelectScreen = () => {

    const { params } = useRoute<Route<'PointSelect', PointSelectScreenProps>>()
    const { goBack } = useNavigation()
    const { point, setPoint } = useCouponPoint()
    const [pointTemp, setPointTemp] = useState(point)

    const maxPoint = params.data.maxPointPrice

    const onSubmit = useCallback(() => {
        setPoint(pointTemp)
        goBack()
    }, [setPoint, pointTemp])

    const onUseAll = useCallback(() => {
        setPointTemp(maxPoint)
    }, [maxPoint])

    const onChangeText = useCallback((t: string) => {
        if (Number.isInteger(Number(t))) {
            setPointTemp(Number(t) > maxPoint ? maxPoint : Number(t))
        }
    }, [params, maxPoint])

    return (
        <ScreenLayout>
            <DefaultHeader title='포인트 선택' disableBtns />
            <View style={styles.body} >
                <View style={styles.explanationContainer} >
                    <BaseText style={styles.explanation} >{NOTI}</BaseText>
                </View>
                <ThinLine />
                <View style={styles.inputContainer} >
                    <TextInput
                        placeholderTextColor={GRAY}
                        placeholder={`${moneyFormat(maxPoint)}포인트 사용가능`}
                        style={[styles.inputText, baseTextStyle]}
                        value={pointTemp === 0 ? '' : pointTemp.toString()}
                        keyboardType='number-pad'
                        onChangeText={onChangeText}
                    />
                    <BorderyButton onPress={onUseAll} >모두 사용</BorderyButton>
                </View>
            </View>
            <ButtonFooter
                text='포인트 적용'
                onPress={onSubmit}
                active={true}
            />
        </ScreenLayout>
    )
}

export default PointSelectScreen

const styles = StyleSheet.create({
    body: {
        flex: 1
    },
    explanationContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    explanation: {
        color: GRAY,
        lineHeight: 32
    },
    inputContainer: {
        marginTop: 24,
        height: 56,
        marginHorizontal: 16,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputText: {
        fontSize: 16,
        marginHorizontal: 16,
        padding: 0,
        flex: 1
    }
})
