import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ReviewWriteCard, { ReviewWriteCardSkeleton } from '../../../components/Cards/ReviewWriteCard'
import EmptyView from '../../../components/View/EmptyView'
import { WIDTH } from '../../../constants/styles'
import { CreateableItemReview } from '../../../graphql/itemReview'
import makeIdArray from '../../../lib/makeIdArray'

interface WriteReviewTabProps {
    data?: CreateableItemReview[]
    loading: boolean
    fetchMore: () => void
}

const WriteReviewTab: React.FC<WriteReviewTabProps> = ({ data, fetchMore, loading }) => {

    const { bottom } = useSafeAreaInsets()

    if (data && data.length === 0) return <View style={styles.container} ><EmptyView /></View>

    return (
        <FlatList
            style={styles.container}
            onEndReached={fetchMore}
            onEndReachedThreshold={0.4}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            data={loading ? makeIdArray(6) as CreateableItemReview[] : data}
            renderItem={({ item }) => loading ? <ReviewWriteCardSkeleton /> : <ReviewWriteCard  {...item} />}
            ListFooterComponent={<View style={{ height: bottom }} />}
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
