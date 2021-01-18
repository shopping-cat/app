import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ReviewMyCard from '../../../components/Cards/ReviewMyCard'
import { WIDTH } from '../../../constants/styles'

const dummyData = Array(20).fill({}).map((_, i) => ({ id: i.toString() }))

const MyReviewTab = () => {
    return (
        <FlatList
            style={styles.container}
            data={dummyData}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            renderItem={() => <ReviewMyCard />}
        />
    )
}

export default MyReviewTab

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        flex: 1
    }
})
