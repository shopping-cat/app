import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { COLOR1, GRAY, LIGHT_COLOR1 } from '../../constants/styles'
import BaseButton from '../Buttons/BaseButton'
import BaseText from '../BaseText'
import CartButton from '../Buttons/CartButton'
const HomeHeader = () => {

    const { navigate } = useNavigation()

    const onSearch = useCallback(() => {
        navigate('Search')
    }, [])

    const onCart = useCallback(() => {
        navigate('Cart')
    }, [])


    return (
        <View style={styles.container} >
            <BaseText style={styles.title} >쇼핑냥이</BaseText>
            <Pressable
                onPress={onSearch}
                style={styles.inputContainer}
            >
                <Icon2 name='search' color={GRAY} size={16} style={{ marginRight: 8 }} />
                <BaseText style={styles.inputText} >검색어를 입력해주세요!</BaseText>
            </Pressable>
            <CartButton />
        </View>
    )
}

export default HomeHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginHorizontal: 16,
    },
    inputContainer: {
        flex: 1,
        height: 32,
        backgroundColor: LIGHT_COLOR1,
        borderRadius: 16,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    inputText: {
        color: GRAY
    }
})