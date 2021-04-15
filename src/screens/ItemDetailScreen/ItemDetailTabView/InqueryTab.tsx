import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../../components/Text/BaseText'
import RightArrowIcon from '../../../components/Svgs/RightArrowIcon'
import { COLOR1, GRAY, LIGHT_GRAY, WIDTH } from '../../../constants/styles'
import { ItemDetail } from '../../../graphql/item'
import useSelectBottomSheet from '../../../hooks/useSelectBottomSheet'

const InqueryTab: React.FC<ItemDetail> = ({ shop }) => {

    const { open } = useSelectBottomSheet()

    const onChat = useCallback(() => {
        const list: { title: string, callback: () => void }[] = []
        if (shop.kakaoLink) list.push({
            title: '카카오톡으로 문의하기',
            callback: () => Linking.openURL(shop.kakaoLink || '')
        })
        if (shop.csPhone) list.push({
            title: '전화로 문의하기',
            callback: () => Linking.openURL(`tel:${shop.csPhone}`)
        })
        open(
            list.map(v => v.title),
            (i) => list[i].callback()
        )
    }, [shop])

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
                <BaseText style={styles.chattingBtnText} >문의하기</BaseText>
                <RightArrowIcon fill='#fff' />
            </Pressable>
        </View>
    )
}

export default InqueryTab

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
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