import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { EASY_PAYMENT_METHOD, EASY_PAYMENT_METHODS } from '../../constants/values'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface PaymentEasyPaymentProps {
    easyPaymentMethod: null | EASY_PAYMENT_METHOD
    setEasyPaymentMethod: (method: null | EASY_PAYMENT_METHOD) => void
}

const EASY_PAYMENT_LIST: { name: EASY_PAYMENT_METHOD, image: any }[] = [
    {
        name: '토스',
        image: require('../../assets/toss.png')
    },
    {
        name: '카카오페이',
        image: require('../../assets/kakao_pay.png')
    }
]

const PaymentEasyPayment: React.FC<PaymentEasyPaymentProps> = ({ easyPaymentMethod, setEasyPaymentMethod }) => {
    return (
        <View style={styles.container} >
            {EASY_PAYMENT_LIST.map(({ image, name }) =>
                <Pressable
                    key={name}
                    onPress={() => setEasyPaymentMethod(name)}
                    style={styles.item}
                >
                    <Icon
                        color={easyPaymentMethod === name ? COLOR2 : GRAY}
                        name={easyPaymentMethod === name ? 'radiobox-marked' : 'radiobox-blank'}
                        size={16}
                    />
                    <Image
                        source={image}
                        style={styles.image}
                        resizeMode='contain'
                    />
                </Pressable>
            )}
            <View style={{ width: 56 + 16 + 16 }} />
        </View>
    )
}

export default PaymentEasyPayment

const styles = StyleSheet.create({
    container: {
        backgroundColor: VERY_LIGHT_GRAY,
        paddingHorizontal: 16,
        paddingVertical: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item: {
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    image: {
        width: 56,
        marginLeft: 16
    }
})