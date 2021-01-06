import React, { useCallback, useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import ThinLine from '../../components/ThinLine'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'

const dummyImage = 'https://image.hanssem.com/hsimg/gds/368/760/760474_A1.jpg'
const dummyName = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const option = '해먹 | 베이지 2'
const items = Array(3).fill(0).map((_, i) => ({ id: (i + 1).toString() }))

const PaymentResultItems = () => {

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
                <BaseText style={styles.title} >주문 상품({items.length})</BaseText>
                <View style={{ transform: [{ rotate: open ? '180deg' : '0deg' }] }} >
                    <DownArrowIcon fill='#000' />
                </View>
            </Pressable>
            {open &&
                <View>
                    <ThinLine />
                    {items.map((v) =>
                        <View key={v.id} style={styles.itemContainer} >
                            <Image
                                style={styles.itemImage}
                                source={{ uri: dummyImage }}
                            />
                            <View>
                                <BaseText>{dummyName}</BaseText>
                                <BaseText style={styles.itemOption} >{option}</BaseText>
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
