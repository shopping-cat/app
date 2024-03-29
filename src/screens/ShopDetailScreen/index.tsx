import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Image, View, NativeSyntheticEvent, NativeScrollEvent, Linking } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseText from '../../components/Text/BaseText'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import ItemCardAThird, { ItemCardAThirdSkeleton } from '../../components/Cards/ItemCardAThird'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RateStars from '../../components/Rate/RateStars'
import StatusBarHeightView from '../../components/View/StatusBarHeightView'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import ThinLine from '../../components/View/ThinLine'
import UpFab from '../../components/Buttons/UpFab'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { ID } from '../../constants/types'
import { useShopItems } from '../../graphql/item'
import { useShop } from '../../graphql/shop'
import useRefreshing from '../../hooks/useRefreshing'
import makeIdArray from '../../lib/makeIdArray'
import ShopDetailSkeleton from './ShopDetailSkeleton'
import useSelectBottomSheet from '../../hooks/useSelectBottomSheet'

type Sort = '인기순' | '최신순'
const SORT_LIST: Sort[] = ['인기순', '최신순']

interface ShopDetailScreenProps {
    id: ID
}


const ShopDetailScreen = () => {

    // UI
    const { navigate } = useNavigation()
    const flatlistRef = useRef<FlatList>(null)
    const { bottom } = useSafeAreaInsets()
    const { open } = useSelectBottomSheet()
    const [sortIndex, setSortIndex] = useState(0)
    const sort = SORT_LIST[sortIndex]
    const [sortSheetVisible, setSortSheetVisible] = useState(false)
    const [headerUnderline, setHeaderUnderline] = useState(false)

    // DATA
    const { params } = useRoute<Route<'ShopDetail', ShopDetailScreenProps>>()
    const { data: shopData } = useShop({ variables: { id: params.id } })
    const { data, fetchMore, loading, refetch } = useShopItems({
        variables: {
            shopId: params.id,
            orderBy: sort
        }
    })
    const { onRefresh, refreshing } = useRefreshing(refetch)

    const onSort = useCallback(() => {
        setSortSheetVisible(true)
    }, [])


    const onChat = useCallback(() => {
        if (!shopData) return
        const list: { title: string, callback: () => void }[] = []
        if (shopData.shop.kakaoLink) list.push({
            title: '카카오톡으로 문의하기',
            callback: () => Linking.openURL(shopData.shop.kakaoLink || '')
        })
        if (shopData.shop.csPhone) list.push({
            title: '전화로 문의하기',
            callback: () => Linking.openURL(`tel:${shopData.shop.csPhone}`)
        })
        open(
            list.map(v => v.title),
            (i) => list[i].callback()
        )
    }, [shopData])

    const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        setHeaderUnderline(nativeEvent.contentOffset.y > 14)
    }, [])


    return (
        <ScreenLayout disableStatusbarHeight >
            <StatusBarHeightView />
            <DefaultHeader underLine={headerUnderline} />
            <FlatList
                onScroll={onScroll}
                ref={flatlistRef}
                showsVerticalScrollIndicator={false}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={() => fetchMore({
                    variables: { offset: data?.shopItems.length }
                })}
                onEndReachedThreshold={0.4}
                overScrollMode='never'
                data={loading ? makeIdArray(9) : data?.shopItems}
                renderItem={({ item }) => loading ? <ItemCardAThirdSkeleton /> : <ItemCardAThird {...item} />}
                numColumns={3}
                columnWrapperStyle={styles.flatlistColumnWrapper}
                ListFooterComponent={<View style={{ height: bottom }} />}
                ListHeaderComponent={
                    shopData ?
                        <>
                            <View style={styles.shopInfoContianer} >
                                <View style={styles.shopInfoContainerLeft} >
                                    <Image
                                        source={{ uri: shopData.shop.shopImage }}
                                        style={styles.image}
                                    />
                                    <View >
                                        <BaseText style={styles.shopName} >{shopData.shop.shopName}</BaseText>
                                        <View style={styles.rateContainer} >
                                            <RateStars
                                                rate={shopData.shop.rate}
                                                spacing={3.5}
                                                emptyColor={VERY_LIGHT_GRAY}
                                            />
                                            <BaseText style={styles.rate}>{shopData.shop.rate} ({shopData.shop.rateNum})</BaseText>
                                        </View>
                                    </View>
                                </View>
                                <Pressable onPress={onChat} >
                                    <Icon name='chat-processing' color={COLOR1} size={32} />
                                </Pressable>
                            </View>
                            <ThinLine />
                            <Pressable
                                onPress={onSort}
                                style={styles.sortBtnContainer}
                            >
                                <BaseText style={styles.sortText} >전체 {shopData.shop.itemNum}건</BaseText>
                                <View style={styles.sortContainer} >
                                    <BaseText style={styles.sortText}>{sort}</BaseText>
                                    <DownArrowIcon />
                                </View>
                            </Pressable>
                        </>
                        :
                        <ShopDetailSkeleton />
                }
            />
            <UpFab
                onPress={() => flatlistRef.current?.scrollToOffset({ offset: 0 })}
                animation={false}
                style={{ marginBottom: bottom }}
            />
            <SelectBottomSheet
                visible={sortSheetVisible}
                onClose={() => setSortSheetVisible(false)}
                list={SORT_LIST}
                selectedIndex={sortIndex}
                onSelect={(i) => setSortIndex(i)}
            />
        </ScreenLayout>
    )
}

export default ShopDetailScreen

const styles = StyleSheet.create({
    shopInfoContianer: {
        width: '100%',
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        height: 96,
        justifyContent: 'space-between'
    },
    shopInfoContainerLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginRight: 16
    },
    shopName: {
        fontSize: 20,
        marginBottom: 8
    },
    rateContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rate: {
        color: GRAY,
        marginLeft: 4
    },
    flatlistColumnWrapper: {
        paddingLeft: 8
    },
    sortBtnContainer: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 16,
        paddingRight: 16
    },
    sortText: {
        color: GRAY,
        marginRight: 8
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})