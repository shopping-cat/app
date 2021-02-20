import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import ReviewWriteCard, { ReviewWriteCardSkeleton } from '../../../components/Cards/ReviewWriteCard'
import { WIDTH } from '../../../constants/styles'
import { CreateableItemReview } from '../../../graphql/itemReview'
import makeIdArray from '../../../lib/makeIdArray'

interface WriteReviewTabProps {
    data?: CreateableItemReview[]
    loading: boolean
    fetchMore: () => void
}

const WriteReviewTab: React.FC<WriteReviewTabProps> = ({ data, fetchMore, loading }) => {

    return (
        <FlatList
            style={styles.container}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.4}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            data={loading ? makeIdArray(6) as CreateableItemReview[] : data}
            renderItem={({ item }) => loading ? <ReviewWriteCardSkeleton /> : <ReviewWriteCard {...item} />}
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
