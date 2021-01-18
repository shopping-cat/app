import React, { useCallback, useEffect, useRef } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'
import BottomSheet from './BottomSheet'
import ButtonFooter from '../ButtonFooter'
import UnderLineInput from '../UnderLineInput'
import { LIGHT_GRAY } from '../../constants/styles'
import useInput from '../../hooks/useInput'

interface CouponRegistBottomSheetProps {
    onRegist: (code: string) => void
    visible: boolean
    onClose: () => void
}

const CouponRegistBottomSheet: React.FC<CouponRegistBottomSheetProps> = ({ onClose, onRegist, visible }) => {

    const inputRef = useRef<TextInput>(null)
    const [code, onChangeCode, _, onClearCode] = useInput('')

    useEffect(() => {
        if (visible) {
            onClearCode()
        } else {
            inputRef.current?.blur()
        }
    }, [visible])

    const onPress = useCallback(() => {
        onRegist(code)
        onClose()
    }, [code])

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
                <View style={styles.container} >
                    <View style={styles.inputContainer} >
                        <UnderLineInput
                            ref={inputRef}
                            value={code}
                            onChangeText={onChangeCode}
                            placeholder='쿠폰 코드'
                            autoFocus={false}
                        />
                    </View>
                    <ButtonFooter
                        active
                        onPress={onPress}
                        text='등록하기'
                        disableTopLine
                    />
                </View>
            }
        />
    )
}

export default CouponRegistBottomSheet

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
    container: {
        backgroundColor: '#fff'
    },
    inputContainer: {
        paddingHorizontal: 16
    }
})
