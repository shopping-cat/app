import React, { useCallback, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import BaseText from '../../components/BaseText'
import ButtonFooter from '../../components/ButtonFooter'
import BorderyButton from '../../components/Buttons/BorderyButton'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import ThinLine from '../../components/ThinLine'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import moneyFormat from '../../lib/moneyFormat'

const dummyIPoint = 2500

const PointSelectScreen = () => {

    const [point, setPoint] = useState(0)
    const active = true

    const onSubmit = useCallback(() => {

    }, [])

    const onUseAll = useCallback(() => {
        setPoint(dummyIPoint)
    }, [dummyIPoint])

    return (
        <ScreenLayout>
            <DefaultHeader title='포인트 선택' disableBtns />
            <View style={styles.body} >
                <View style={styles.explanationContainer} >
                    <BaseText style={styles.explanation} >{`포인트는 각각 상품마다 상품 가격 비율에 맞게 적용됩니다.\n부분적으로 환불/취소 하실시 포인트도 부분적으로 환불됩니다.`}</BaseText>
                </View>
                <ThinLine />
                <View style={styles.inputContainer} >
                    <TextInput
                        placeholderTextColor={GRAY}
                        placeholder={`${moneyFormat(dummyIPoint)}포인트 사용가능`}
                        style={styles.inputText}
                        value={point === 0 ? '' : point.toString()}
                        keyboardType='number-pad'
                        onChangeText={(t) => setPoint(Number(t))}
                    />
                    <BorderyButton onPress={onUseAll} >모두 사용</BorderyButton>
                </View>
            </View>
            <ButtonFooter
                text='포인트 적용'
                onPress={onSubmit}
                active={active}
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
        fontFamily: 'BMJUA',
        flex: 1
    }
})
