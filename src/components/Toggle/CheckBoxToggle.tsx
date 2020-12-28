import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { COLOR1, GRAY } from '../../constants/styles'
import CheckIcon from '../Svgs/CheckIcon'

interface CheckBoxToggleProps {
    active: boolean
    onPress: () => void
}

const CheckBoxToggle: React.FC<CheckBoxToggleProps> = ({ active, onPress }) => {
    return (
        <Pressable
            style={[
                styles.container,
                {
                    backgroundColor: active ? COLOR1 : undefined,
                    borderWidth: active ? 0 : 2
                }
            ]}
        >
            {active && <CheckIcon fill='#fff' />}
        </Pressable>
    )
}

export default CheckBoxToggle

const styles = StyleSheet.create({
    container: {
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: GRAY
    }
})
