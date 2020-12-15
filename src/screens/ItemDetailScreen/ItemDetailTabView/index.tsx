import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { SceneMap, TabView } from 'react-native-tab-view'


import ItemInfoTab from './ItemInfoTab'
import ReviewTab from './ReviewTab'
import OrderInfoTab from './OrderInfoTab'
import InqueryTab from './InqueryTab'
import { WIDTH } from '../../../constants/styles'

interface ItemDetailTabViewProps {
    index: number
    onIndexChange: (v: number) => void
}

const ItemDetailTabView: React.FC<ItemDetailTabViewProps> = ({ index, onIndexChange }) => {

    const [tabViewRoutes] = useState([
        { key: 'itemInfo', title: '상품정보' },
        { key: 'review', title: '리뷰' },
        { key: 'orderInfo', title: '주문정보' },
        { key: 'inquery', title: '문의' },
    ])

    const renderScene = SceneMap({
        itemInfo: ItemInfoTab,
        review: ReviewTab,
        orderInfo: OrderInfoTab,
        inquery: InqueryTab
    })

    return (
        <TabView
            navigationState={{ index, routes: tabViewRoutes }}
            renderScene={renderScene}
            onIndexChange={onIndexChange}
            initialLayout={{ width: WIDTH }}
            renderTabBar={() => null}
        />
    )
}

export default ItemDetailTabView

const styles = StyleSheet.create({

})
