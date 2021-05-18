import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { Notification } from '../../graphql/notification'
import dateFormat from '../../lib/dateFormat'
import BaseText from '../Text/BaseText'

const NotificationCard: React.FC<Notification> = ({ title, content, createdAt, image, type, checked, params }) => {

    const { navigate } = useNavigation()

    const onPress = useCallback(() => {
        if (type === 'none') return
        navigate(type, params?.data)
    }, [type, params])

    return (
        <Pressable
            onPress={onPress}
            style={[styles.container, { backgroundColor: checked ? '#fff' : VERY_LIGHT_GRAY }]}
        >
            <BaseText style={styles.title} >{title}</BaseText>
            <BaseText style={styles.date} >{dateFormat(createdAt)}</BaseText>
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
        paddingHorizontal: 16,
        paddingVertical: 24
    },
    title: {
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