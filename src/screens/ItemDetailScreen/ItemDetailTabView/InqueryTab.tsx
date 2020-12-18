import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { BaseButton } from 'react-native-gesture-handler'
import BaseText from '../../../components/BaseText'
import RightArrowIcon from '../../../components/Svgs/RightArrowIcon'
import { COLOR1, GRAY, LIGHT_GRAY } from '../../../constants/styles'

const InqueryTab = () => {

    const { navigate } = useNavigation()

    const onChat = useCallback(() => {
        navigate('Chat')
    }, [])

    return (
        <View style={styles.container} >
            <View style={styles.infoContainer} >
                <BaseText style={styles.title} >상품 문의</BaseText>
                <View style={styles.exampleContainer} >
                    <View style={styles.exampleBox} >
                        <BaseText style={styles.exampleBoxText} >예시</BaseText>
                    </View>
                    <BaseText style={styles.example} >상품이 언제 재입고 되나요?</BaseText>
                </View>
                <View style={styles.exampleSpac} />
                <View style={styles.exampleContainer} >
                    <View style={styles.exampleBox} >
                        <BaseText style={styles.exampleBoxText} >예시</BaseText>
                    </View>
                    <BaseText style={styles.example} >배송이 지연되는 이유가 뭔가요?</BaseText>
                </View>
            </View>
            <Pressable
                style={styles.chattingBtn}
                onPress={onChat}
            >
                <BaseText style={styles.chattingBtnText} >채팅으로 문의하기</BaseText>
                <RightArrowIcon />
            </Pressable>
        </View>
    )
}

export default InqueryTab

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    infoContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    title: {
        fontSize: 16,
        marginBottom: 24
    },
    exampleContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    exampleBox: {
        width: 36,
        height: 16,
        borderRadius: 4,
        borderColor: LIGHT_GRAY,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16
    },
    exampleBoxText: {
        fontSize: 12,
        color: LIGHT_GRAY,
    },
    example: {
        fontSize: 16,
        color: GRAY
    },
    exampleSpac: {
        height: 16
    },
    chattingBtn: {
        width: '100%',
        height: 56,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLOR1
    },
    chattingBtnText: {
        fontSize: 16,
        color: '#fff'
    }
})