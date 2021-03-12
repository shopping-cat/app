import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import BaseText from '../Text/BaseText'

const NotificationCard: React.FC<any> = ({ title, content, date, image, checked, type }) => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        if (type === 'review') navigate('Review')
        // check
    }, [type])

    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, { backgroundColor: checked ? '#fff' : VERY_LIGHT_GRAY }]}
        >
            <BaseText style={styles.title} >{title}</BaseText>
            <BaseText style={styles.date} >{date}</BaseText>
            <BaseText style={styles.content} >{content}</BaseText>
            {image && <Image
                source={{ uri: image }}
                style={styles.image}
            />}
        </Pressable>
    )
}

export default NotificationCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 16
    },
    title: {
        fontSize: 16,
        marginBottom: 16
    },
    date: {
        color: GRAY,
        position: 'absolute',
        right: 16,
        top: 16
    },
    content: {
        color: GRAY,
        lineHeight: 20,
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginTop: 16
    }
})