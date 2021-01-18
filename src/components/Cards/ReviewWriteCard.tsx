import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, StyleSheet, View } from 'react-native'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import BaseText from '../BaseText'
import RateStars from '../RateStars'

const dummyImage = 'https://i.guim.co.uk/img/media/7d04c4cb7510a4bd9a8bec449f53425aeccee895/289_287_1442_866/master/1442.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=6b7cb2d2ab7847fb0623d2757c1260ba'
const dummyName = '딱해먹 고양이 구름다리 벽걸이 캣타워'
const dummyDate = '2020.05.18'

const ReviewWirteCard = () => {

    const { navigate } = useNavigation()

    return (
        <Pressable
            onPress={() => navigate('ReviewPost')}
            style={styles.container}
        >
            <Image
                source={{ uri: dummyImage }}
                style={styles.image}
            />
            <View>
                <BaseText>{dummyName}</BaseText>
                <BaseText style={styles.date} >배송완료일 {dummyDate}</BaseText>
                <RateStars
                    rate={0}
                    emptyColor={VERY_LIGHT_GRAY}
                    starSize={24}
                    spacing={4}
                />
            </View>
        </Pressable>
    )
}

export default ReviewWirteCard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        flexDirection: 'row'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 8,
        marginRight: 16
    },
    date: {
        marginVertical: 16,
        color: GRAY
    }
})
