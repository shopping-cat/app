import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import BaseText from '../BaseText'
import BackArrowIcon from '../Svgs/BackArrowIcon'

interface DefaultHeaderProps {
    title?: string
    underLine?: boolean
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ title, underLine }) => {

    const { canGoBack, goBack, navigate } = useNavigation()

    const onSearch = useCallback(() => {
        navigate('Search')
    }, [])

    const onCart = useCallback(() => {
        navigate('Cart')
    }, [])

    return (
        <View style={[styles.container, { borderBottomWidth: underLine ? 1 : 0 }]} >
            {canGoBack &&
                <Pressable onPress={goBack} style={styles.btn} >
                    <BackArrowIcon fill={GRAY} />
                </Pressable>
            }
            <View style={styles.titleContainer} >
                <BaseText style={styles.title} >{title}</BaseText>
            </View>
            <Pressable onPress={onSearch} style={styles.btn} >
                <Icon2 name='search' size={24} color={COLOR1} />
            </Pressable>
            <Pressable onPress={onCart} style={styles.btn} >
                <Icon name='cart-outline' size={24} color={COLOR1} />
            </Pressable>
        </View>
    )
}

DefaultHeader.defaultProps = {
    underLine: true
}

export default DefaultHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: VERY_LIGHT_GRAY
    },
    btn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 1,
        paddingLeft: 20
    },
    title: {
        fontSize: 20
    }
})