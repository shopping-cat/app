import React, { useCallback, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import ThinLine from '../../components/ThinLine'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { CompletePayment } from '../../graphql/payment'


const PaymentResultItems: React.FC<CompletePayment> = ({ orders }) => {

    const [open, setOpen] = useState(false)

    const onAccordian = useCallback(() => {
        setOpen(!open)
    }, [open])

    return (
        <>
            <Pressable
                onPress={onAccordian}
                style={styles.titleContainer}
            >
                <BaseText style={styles.title} >주문 상품({orders.length})</BaseText>
                <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }} >
                    <DownArrowIcon fill='#000' />
                </View>
            </Pressable>
            {open &&
                <View>
                    <ThinLine />
                    {orders.map(({ id, item, stringOptionNum }) =>
                        <View key={id} style={styles.itemContainer} >
                            <Image
                                style={styles.itemImage}
                                source={{ uri: item.mainImage }}
                            />
                            <View>
                                <BaseText>{item.name}</BaseText>
                                <BaseText style={styles.itemOption} >{stringOptionNum}</BaseText>
                            </View>
                        </View>
                    )}
                    <ThinLine />
                </View>
            }
        </>
    )
}

export default PaymentResultItems

const styles = StyleSheet.create({
    titleContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1
    },
    title: {
        fontSize: 18
    },
    itemContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexDirection: 'row'
    },
    itemImage: {
        width: 48,
        height: 48,
        borderRadius: 8,
        marginRight: 16
    },
    itemOption: {
        fontSize: 14,
        color: GRAY,
        marginTop: 8
    }
})
