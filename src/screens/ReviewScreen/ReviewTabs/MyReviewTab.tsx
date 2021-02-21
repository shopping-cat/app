import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ReviewMyCard from '../../../components/Cards/ReviewMyCard'
import { WIDTH } from '../../../constants/styles'
import { MyItemReview } from '../../../graphql/itemReview'

interface MyReviewTabProps {
    data?: MyItemReview[]
    fetchMore: () => void
}

const MyReviewTab: React.FC<MyReviewTabProps> = ({ fetchMore, data }) => {

    const { bottom } = useSafeAreaInsets()

    return (
        <FlatList
            style={styles.container}
            overScrollMode='never'
            onEndReached={fetchMore}
            onEndReachedThreshold={0.4}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            data={data}
            renderItem={({ item }) => <ReviewMyCard {...item} />}
            ListFooterComponent={<View style={{ height: bottom }} />}
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
