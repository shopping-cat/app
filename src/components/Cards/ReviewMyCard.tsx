import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY, WIDTH } from '../../constants/styles'
import { IS_ANDROID, IS_IOS } from '../../constants/values'
import { MyItemReview } from '../../graphql/itemReview'
import dateFormat from '../../lib/dateFormat'
import BaseText from '../Text/BaseText'
import RateStars from '../Rate/RateStars'

const ReviewMyCard: React.FC<MyItemReview> = (props) => {

    const { content, createdAt, id, images, item, rate } = props

    const { navigate } = useNavigation()

    const onImage = useCallback((index: number) => { // 이미지 확대해서 보여주기
        navigate('ImageView', { index, images: images.map(v => v.uri) })
    }, [images])

    const onModify = useCallback(() => {
        navigate('ReviewModify', props)
    }, [props])



    return (
        <View style={styles.container} >
            <View style={styles.nameContainer} >
                <BaseText style={styles.name} >{item.name}</BaseText>
                <TouchableOpacity
                    onPress={onModify}
                >
                    <BaseText style={styles.modify} >수정하기</BaseText>
                </TouchableOpacity>
            </View>
            <RateStars
                rate={rate}
                spacing={4}
                starSize={20}
            />
            {IS_IOS && images.length !== 0 && <View style={styles.reviewImagesContainer} >
                <FlatList
                    horizontal
                    data={images}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id.toString()}
                    ListHeaderComponent={<View style={{ width: 16 }} />}
                    ListFooterComponent={<View style={{ width: 12 }} />} // image component에 marginRight 4 가 있으니깐 12만
                    renderItem={({ item, index }) =>
                        <Pressable
                            onPress={() => onImage(index)}
                        >
                            <Image
                                source={{ uri: item.uri }}
                                style={{ width: 56, height: 56, marginRight: 4 }}
                            />
                        </Pressable >
                    }
                />
            </View>}
            {IS_ANDROID && images.length !== 0 &&
                <View style={styles.androidReviewImagesContainer} >
                    {images.map((item, index) =>
                        <Pressable
                            key={item.id}
                            onPress={() => onImage(index)}
                        >
                            <Image
                                source={{ uri: item.uri }}
                                style={{ width: 56, height: 56, marginRight: 4, marginTop: 4 }}
                            />
                        </Pressable >
                    )}
                </View>
            }
            {!!content && <BaseText style={styles.content} >{content}</BaseText>}
            <BaseText style={styles.date} >{dateFormat(createdAt)}</BaseText>
        </View >
    )
}

export default ReviewMyCard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 16,
        paddingVertical: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    nameContainer: {
        flexDirection: 'row',
        flex: 1,
        marginBottom: 16
    },
    name: {
        fontSize: 16,
        flex: 1,
        marginRight: 20
    },
    modify: {
        color: COLOR2
    },
    reviewImagesContainer: {
        width: WIDTH,
        marginLeft: -16,
        marginTop: 16
    },
    androidReviewImagesContainer: {
        flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        marginTop: 16
    },
    content: {
        lineHeight: 20,
        marginTop: 16
    },
    date: {
        color: GRAY,
        marginTop: 16
    }
})
