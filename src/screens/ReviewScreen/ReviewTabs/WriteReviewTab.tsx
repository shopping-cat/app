import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ReviewWriteCard from '../../../components/Cards/ReviewWriteCard'
import { WIDTH } from '../../../constants/styles'

const dummyData = Array(20).fill({}).map((_, i) => ({ id: i.toString() }))

const WriteReviewTab = () => {
    return (
        <FlatList
            style={styles.container}
            data={dummyData}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            renderItem={() => <ReviewWriteCard />}
        />
    )
}

export default WriteReviewTab

const styles = StyleSheet.create({
    container: {
        width: WIDTH,
        flex: 1
    }
})
