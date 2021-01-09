import React, { useEffect, useState } from 'react'
import { Animated, Pressable, StyleSheet } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseText from '../../components/BaseText'
import { COLOR1, SPRING_CONFIG } from '../../constants/styles'

interface ZzimScreenSelectModeFooterProps {
    visible: boolean
    onSelectAll: () => void
    onCart: () => void
    onDelete: () => void
}

const EXTRA_HEIGHT = 20

const ZzimScreenSelectModeFooter: React.FC<ZzimScreenSelectModeFooterProps> = ({ visible, onCart, onDelete, onSelectAll }) => {

    const { bottom } = useSafeAreaInsets()

    const [animation] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.spring(animation, {
            toValue: visible ? 1 : 0,
            useNativeDriver: true,
            ...SPRING_CONFIG
        }).start()
    }, [visible])

    const translateY = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [bottom + 56 + EXTRA_HEIGHT, EXTRA_HEIGHT]
    })

    return (
        <Animated.View
            style={[
                styles.container,
                { height: 56 + bottom + EXTRA_HEIGHT, paddingBottom: bottom + EXTRA_HEIGHT },
                { transform: [{ translateY }] }
            ]}
        >
            <Pressable
                onPress={onSelectAll}
                style={styles.btn}
            >
                <Icon name='check-circle-outline' color='#fff' size={24} />
                <BaseText style={styles.label} >전체선택</BaseText>
            </Pressable>
            <Pressable
                onPress={onCart}
                style={styles.btn}
            >
                <Icon name='cart-outline' color='#fff' size={24} />
                <BaseText style={styles.label} >담기</BaseText>
            </Pressable>
            <Pressable
                onPress={onDelete}
                style={styles.btn}
            >
                <Icon name='trash-can-outline' color='#fff' size={24} />
                <BaseText style={styles.label} >삭제</BaseText>
            </Pressable>
        </Animated.View>
    )
}

export default ZzimScreenSelectModeFooter

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: COLOR1,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 12,
        color: '#fff',
        marginTop: 6
    }
})
