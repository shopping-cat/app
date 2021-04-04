import { useNavigation } from '@react-navigation/core'
import React, { useCallback, useRef, useState } from 'react'
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { WIDTH } from '../../constants/styles'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

const dummyImages = [
    'https://pgnqdrjultom1827145.cdn.ntruss.com/img/49/4f/494f75b2c002eca57fd311ca9821a045c15fb13155b02af0012218854c01c5aa_v1.jpg',
    'https://cdn.joongboo.com/news/photo/202011/2020111601000663600025391.jpg',
    'https://lh3.googleusercontent.com/proxy/kgwum04RrjL-V36FOu84keRCwNtGhWChOuVs6EKT4-9f3udAeBXBaz5pZSpD4fA0nQOFr4Qa67VfoOoMo9vYBYNEvrGew679-cSA7XC-xDWZBVXJDga0efJoXOszvCGt'
]

const BannerCarousel = () => {

    const scrollViewRef = useRef<ScrollView>(null)
    const { navigate } = useNavigation()
    const [scrollX] = useState(new Animated.Value(0))
    const [currentIndex, setCurrentIndex] = useState(0)

    const onScrollEndDrag = useCallback(() => { // infinity scroll
        scrollViewRef.current?.scrollTo({ animated: false, x: (currentIndex + dummyImages.length) * WIDTH })
    }, [currentIndex, dummyImages])

    return (
        <View style={styles.container} >
            <AnimatedScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                overScrollMode='never'
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        //@ts-ignore
                        listener: ({ nativeEvent }) => setCurrentIndex(Math.round(nativeEvent.contentOffset.x / WIDTH) % dummyImages.length),
                        useNativeDriver: true
                    }
                )}
                onMomentumScrollEnd={onScrollEndDrag}
            >
                {[...dummyImages, ...dummyImages, ...dummyImages].map((item, index) =>
                    <Pressable
                        onPress={() => navigate('EventDetail')}
                        key={index}
                    >
                        <Image
                            style={styles.image}
                            source={{ uri: item }}
                        />
                    </Pressable>
                )}
            </AnimatedScrollView>
            <View style={styles.indicatorContainer} >
                {dummyImages.map((_, i) =>
                    <View key={i.toString()} style={[styles.dot, { opacity: i === currentIndex ? 1 : 0.5 }]} />
                )}
            </View>
        </View>
    )
}

export default BannerCarousel

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        height: WIDTH * 9 / 16,
        alignItems: 'center'
    },
    image: {
        width: WIDTH,
        height: WIDTH * 9 / 16
    },
    indicatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 16
    },
    dot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#fff',
        marginHorizontal: 3,
        elevation: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
    }
})
