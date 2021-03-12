import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LIGHT_GRAY } from '../../constants/styles'
import BaseText from '../Text/BaseText'
import CheckIcon from '../Svgs/CheckIcon'
import BottomSheet from './BottomSheet'

interface SelectBottomSheetProps {
    list: string[]
    selectedIndex?: number
    onSelect: (index: number) => void
    visible: boolean
    onClose: () => void
}

const SelectBottomSheet: React.FC<SelectBottomSheetProps> = ({ list, onClose, onSelect, selectedIndex, visible }) => {

    const { bottom } = useSafeAreaInsets()

    const onPress = useCallback((index: number) => {
        onSelect(index)
        onClose()
    }, [])

    return (
        <BottomSheet
            visible={visible}
            onClose={onClose}
            draggAbleHeaderRender={() =>
                <View style={styles.swipeHandleConatiner} >
                    <View style={styles.swipeHandle} />
                </View>
            }
            render={() =>
                <ScrollView style={[styles.renderContainer, { maxHeight: 56 * 8 + bottom }]} >
                    {list.map((v, i) =>
                        <TouchableOpacity
                            key={v + i}
                            style={styles.itemContainer}
                            onPress={() => onPress(i)}
                        >
                            <BaseText>{v}</BaseText>
                            {selectedIndex === i &&
                                <CheckIcon />
                            }
                        </TouchableOpacity>
                    )}
                    <View style={{ height: bottom }} />
                </ScrollView>
            }
        />
    )
}

export default SelectBottomSheet

const styles = StyleSheet.create({
    swipeHandleConatiner: {
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: '100%',
        height: 25,
        marginBottom: -1, // container랑 겹치기 위해서
        alignItems: 'center',
        paddingTop: 16,
        backgroundColor: '#fff'
    },
    swipeHandle: {
        width: 48,
        height: 4,
        borderRadius: 2,
        backgroundColor: LIGHT_GRAY
    },
    renderContainer: {
        backgroundColor: '#fff',
    },
    itemContainer: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between'
    }
})
