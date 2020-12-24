import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { GRAY } from '../../constants/styles'
import BaseText from '../BaseText'
import BackArrowIcon from '../Svgs/BackArrowIcon'

interface ImageViewHeaderProps {
    currentIndex: number
    totalNumber: number
}

const ImageViewHeader: React.FC<ImageViewHeaderProps> = ({ currentIndex, totalNumber }) => {

    const { goBack } = useNavigation()

    return (
        <View style={styles.container} >
            <Pressable
                style={styles.backBtn}
                onPress={goBack}
            >
                <BackArrowIcon fill={GRAY} />
            </Pressable>
            <BaseText style={styles.text} >이미지 상세보기</BaseText>
        </View>
    )
}

export default ImageViewHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center'
    },
    backBtn: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        marginLeft: 16
    }
})
