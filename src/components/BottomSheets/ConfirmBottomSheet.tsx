import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import BaseText from '../Text/BaseText'
import CheckIcon from '../Svgs/CheckIcon'
import BottomSheet from './BottomSheet'
import useConfirm from '../../hooks/useConfirm'
import TouchableScale from '../Buttons/TouchableScale'

const ConfirmBottomSheet = () => {

    const { bottom } = useSafeAreaInsets()
    const { close, content, onConfirm, title, visible } = useConfirm()


    return (
        <BottomSheet
            visible={visible}
            onClose={close}
            draggAbleHeaderRender={() =>
                <View style={styles.swipeHandleConatiner} >
                    <View style={styles.swipeHandle} />
                </View>
            }
            render={() =>
                <View style={styles.renderContainer} >
                    <BaseText style={styles.title} >{title}</BaseText>
                    <BaseText style={styles.content} >{content}</BaseText>
                    <View>
                        <View style={styles.footerContainer}>
                            <View style={styles.footerBtnContainer} >
                                <TouchableScale
                                    onPress={close}
                                    style={styles.footerClose}
                                    contianerStyle={styles.footerCloseTouchableContainer}
                                    targetScale={0.8}
                                >
                                    <BaseText style={styles.footerBtnText}>아니요</BaseText>
                                </TouchableScale>
                            </View>
                            <View style={styles.footerBtnContainer} >
                                <TouchableScale
                                    onPress={onConfirm}
                                    style={styles.footerConfirmBtn}
                                    contianerStyle={styles.footerConfirmBtnTouchableContainer}
                                    targetScale={0.8}
                                >
                                    <BaseText style={[styles.footerBtnText, { color: '#fff' }]}>네</BaseText>
                                </TouchableScale>
                            </View>
                        </View>
                    </View>
                    <View style={{ height: bottom }} />
                </View>
            }
        />
    )
}

export default ConfirmBottomSheet

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
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        marginVertical: 16
    },
    content: {
        color: GRAY,
        marginBottom: 24
    },
    footerContainer: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        borderTopColor: VERY_LIGHT_GRAY,
        borderTopWidth: 1
    },
    footerBtnContainer: {
        flex: 1,
        padding: 16
    },
    footerClose: {
        flex: 1,
        borderColor: LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerCloseTouchableContainer: {
        flex: 1
    },
    footerConfirmBtn: {
        flex: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR1
    },
    footerConfirmBtnTouchableContainer: {
        flex: 1
    },
    footerBtnText: {
        fontSize: 20
    },
})
