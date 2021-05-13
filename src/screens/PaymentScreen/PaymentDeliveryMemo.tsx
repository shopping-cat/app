import React, { useEffect, useRef } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import BaseText, { baseTextStyle } from '../../components/Text/BaseText'
import { COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { DELIVERY_MEMOS } from '../../constants/values'

interface PaymentDeliveryMemoProps {
    memo: string
    setMemo: (t: string) => void
    onPress: () => void
}

const PaymentDeliveryMemo: React.FC<PaymentDeliveryMemoProps> = ({ setMemo, onPress, memo }) => {

    const inputRef = useRef<TextInput>(null)

    const isDirectWrite = !DELIVERY_MEMOS.includes(memo)

    useEffect(() => {
        if (isDirectWrite) {
            inputRef.current?.focus()
        }
    }, [isDirectWrite])

    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >배송 메모</BaseText>
            <TouchableOpacity
                onPress={onPress}
                style={styles.modifyBtn}
            >
                <BaseText style={styles.modify} >{'선택하기'}</BaseText>
            </TouchableOpacity>
            <View style={styles.infoContainer} >
                {!isDirectWrite && <BaseText style={styles.info} >{memo}</BaseText>}
                {isDirectWrite &&
                    <TextInput
                        ref={inputRef}
                        value={memo}
                        onChangeText={t => setMemo(t)}
                        placeholder='직접입력'
                        style={[styles.info, baseTextStyle]}
                        placeholderTextColor={GRAY}
                        maxLength={200}
                    />
                }
            </View>
        </View>
    )
}

export default PaymentDeliveryMemo

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1
    },
    infoContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    modifyBtn: {
        position: 'absolute',
        right: 16,
        top: 24,
        width: 56,
        height: 56,
        alignItems: 'flex-end'
    },
    modify: {
        color: COLOR2,
    },
    title: {
        fontSize: 18,
        marginBottom: 16,
    },
    info: {
        color: GRAY,
        flex: 1,
        padding: 0
    },
})
