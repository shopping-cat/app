import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { useHomeItems } from '../../../graphql/item'
import useRefreshing from '../../../hooks/useRefreshing'
import makeIdArray from '../../../lib/makeIdArray'
import BannerCarousel from '../../../components/Carousel/BannerCarousel'
import HomeItemCard from '../../../components/Cards/HomeItemCard'
import CompanyInfo from '../../../components/Layouts/CompanyInfo'

const HomeTab = React.forwardRef<FlatList>((_, ref) => {

    const { data, loading, refetch, fetchMore } = useHomeItems()
    const { onRefresh, refreshing } = useRefreshing(refetch)

    return (
        <FlatList
            ref={ref}
            refreshing={refreshing}
            onRefresh={onRefresh}
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            data={loading ? makeIdArray(2) : data?.homeItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <HomeItemCard {...item} loading={loading} index={index} />}
            ListHeaderComponent={<BannerCarousel />}
            ListFooterComponent={<CompanyInfo />}
            ListFooterComponentStyle={{ marginTop: 24 }}
        />

    )
})

export default HomeTab

const styles = StyleSheet.create({
})
