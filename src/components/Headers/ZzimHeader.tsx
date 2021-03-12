import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { COLOR1 } from '../../constants/styles'
import BaseText from '../Text/BaseText'
import CartButton from '../Buttons/CartButton'

interface ZzimHeaderProps {
    isSelectMode: boolean
    onSelectMode: () => void
    onComplete: () => void
}

const ZzimHeader: React.FC<ZzimHeaderProps> = ({ isSelectMode, onComplete, onSelectMode }) => {


    return (
        <View style={styles.container} >
            <View style={styles.titleContainer} >
                <BaseText style={styles.title} >{!isSelectMode ? '찜한 상품' : '상품 선택'}</BaseText>
            </View>
            {isSelectMode
                ?
                <Pressable
                    onPress={onComplete}
                    style={styles.competeBtn}
                >
                    <BaseText style={styles.completeText} >완료</BaseText>
                </Pressable>
                : <>
                    <Pressable onPress={onSelectMode} style={styles.btn} >
                        <Icon name='pencil-outline' size={24} color={COLOR1} />
                    </Pressable>
                    <CartButton />
                </>}
        </View>
    )
}

export default ZzimHeader

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
    competeBtn: {
        width: 50,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: COLOR1,
        marginRight: 16
    },
    completeText: {
        color: '#fff'
    }
})