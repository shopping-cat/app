import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'
import BaseText from '../BaseText'
import BaseButton from '../Buttons/BaseButton'

const ItemDetailHeader = () => {

    const { goBack, navigate } = useNavigation()

    const onCart = useCallback(() => {
        navigate('Cart')
    }, [])

    return (
        <View style={styles.container} >
            <BaseButton
                onPress={goBack}
                style={styles.backContainer}
            >
                <Icon2 name='arrow-left' size={24} color='#fff' />
            </BaseButton>
            <View style={styles.titleContainer} >
                <BaseText style={styles.title} >상품정보</BaseText>
            </View>
            <BaseButton
                onPress={onCart}
                style={styles.cartContainer}
            >
                <Icon name='cart-outline' color='#000' size={24} />
            </BaseButton>
        </View>
    )
}

export default ItemDetailHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backContainer: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 1
    },
    title: {
        marginLeft: 16,
        fontSize: 20
    },
    cartContainer: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    }
})