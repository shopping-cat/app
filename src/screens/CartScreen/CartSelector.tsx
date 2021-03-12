import React from 'react'
import { StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import BorderyButton from '../../components/Buttons/BorderyButton'
import CheckBoxToggle from '../../components/Toggle/CheckBoxToggle'
import { GRAY } from '../../constants/styles'

interface CartSelectorProps {
    totalNumber: number
    selectedNumber: number
    onSelectAll: () => void
    onRemove: () => void
}

const CartSelector: React.FC<CartSelectorProps> = ({ onSelectAll, selectedNumber, totalNumber, onRemove }) => {


    return (
        <View style={styles.container} >
            <CheckBoxToggle
                active={totalNumber === selectedNumber}
                onPress={onSelectAll}
            />
            <BaseText style={styles.selectAllText} >전체선택({selectedNumber}/{totalNumber})</BaseText>
            <BorderyButton
                onPress={onRemove}
                active={selectedNumber > 0}
                style={styles.btn}
            >
                선택삭제
            </BorderyButton>
        </View>
    )
}

export default CartSelector

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    selectAllText: {
        color: GRAY,
        fontSize: 16,
        marginLeft: 16
    },
    btn: {
        position: 'absolute',
        right: 16
    }
})