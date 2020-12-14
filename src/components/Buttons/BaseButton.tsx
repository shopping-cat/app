import React from 'react'
import { StyleSheet, PressableProps, Pressable } from 'react-native'

const BaseButton: React.FC<PressableProps> = (props) => {
    return (
        <Pressable
            // style={[styles.pressable, props.style]}
            {...props}
        />
    )
}

export default BaseButton

const styles = StyleSheet.create({
    pressable: {
        overflow: 'hidden'
    }
})
