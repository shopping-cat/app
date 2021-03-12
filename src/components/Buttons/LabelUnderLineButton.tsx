import React, { useCallback, useState } from 'react'
import { LayoutChangeEvent, Pressable, StyleSheet, Text, View } from 'react-native'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import BaseText from '../Text/BaseText'
import RightArrowIcon from '../Svgs/RightArrowIcon'

interface LabelUnderLineButtonProps {
    label: string
    disableArrowRight?: boolean
    onPress: () => void
}

const LabelUnderLineButton: React.FC<LabelUnderLineButtonProps> = ({ onPress, disableArrowRight, label }) => {

    const [width, setWidth] = useState(0)

    const onLayout = useCallback(({ nativeEvent }: LayoutChangeEvent) => {
        setWidth(nativeEvent.layout.width)
    }, [])

    return (
        <Pressable
            onPress={onPress}
            style={styles.container}
        >
            <BaseText
                onLayout={onLayout}
                style={styles.label}
            >{label}</BaseText>
            {!disableArrowRight && <RightArrowIcon fill={GRAY} />}
            <View style={[styles.underLine, { width }]} />
        </Pressable>
    )
}

export default LabelUnderLineButton

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        fontSize: 14,
    },
    underLine: {
        height: 1,
        backgroundColor: VERY_LIGHT_GRAY,
        position: 'absolute',
        bottom: 0,
        left: 0
    }
})