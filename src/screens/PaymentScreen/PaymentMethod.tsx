import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import BaseText from '../../components/BaseText'
import RightArrowIcon from '../../components/Svgs/RightArrowIcon'
import { GRAY } from '../../constants/styles'

interface PaymentMethodProps {
    onMethod: () => void
    method: string
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ method, onMethod }) => {
    return (
        <Pressable
            onPress={onMethod}
            style={styles.titleContainer}
        >
            <BaseText style={styles.title} >결제방식</BaseText>
            <View style={styles.row} >
                <BaseText style={styles.method} >{method}</BaseText>
                <RightArrowIcon fill={GRAY} />
            </View>
        </Pressable>
    )
}

export default PaymentMethod

const styles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    method: {
        fontSize: 16,
        color: GRAY,
        marginRight: 16
    }
})