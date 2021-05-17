import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import BaseText from '../Text/BaseText'
import CartButton from '../Buttons/CartButton'
import BackArrowIcon from '../Svgs/BackArrowIcon'

interface DefaultHeaderProps {
    title?: string
    underLine?: boolean
    disableBtns?: boolean
    disableGoBack?: boolean
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ title, underLine, disableBtns, disableGoBack }) => {

    const { canGoBack, goBack, navigate } = useNavigation()

    const onSearch = useCallback(() => {
        navigate('Search')
    }, [])


    return (
        <View style={styles.container} >
            {canGoBack() && !disableGoBack &&
                <Pressable onPress={goBack} style={styles.btn} >
                    <BackArrowIcon fill={GRAY} />
                </Pressable>
            }
            <View style={styles.titleContainer} >
                <BaseText style={styles.title} >{title}</BaseText>
            </View>
            {!disableBtns && <>
                <Pressable onPress={onSearch} style={styles.btn} >
                    <Icon2 name='search' size={24} color={COLOR1} />
                </Pressable>
                <CartButton />
            </>}
            <View style={[styles.underLine, { backgroundColor: underLine ? VERY_LIGHT_GRAY : undefined }]} />
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
        alignItems: 'center'
    },
    btn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleContainer: {
        flex: 1,
        paddingLeft: 16
    },
    title: {
        fontSize: 20
    },
    underLine: {
        height: 1,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0
    }
})