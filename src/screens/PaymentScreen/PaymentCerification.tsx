import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { OrderCalculate } from '../../graphql/order'


interface PaymentCertificationProps {
    data: OrderCalculate
}

const PaymentCertification: React.FC<PaymentCertificationProps> = ({ data }) => {

    const { navigate } = useNavigation()

    const onModify = useCallback(() => {
        navigate('UserCertification')
    }, [])

    if (data.user.certificatedInfo) return null

    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >본인인증</BaseText>
            <TouchableOpacity
                onPress={onModify}
                style={styles.modifyBtn}
            >
                <BaseText style={styles.modify} >인증하기</BaseText>
            </TouchableOpacity>
            <BaseText style={styles.emptyText} >최초 1회 본인인증이 필요합니다</BaseText>
        </View>
    )
}

export default PaymentCertification

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18,
        marginBottom: 16
    },
    emptyText: {
        color: COLOR1
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
    info: {
        color: GRAY
    },
    spac: {
        height: 10
    }
})
