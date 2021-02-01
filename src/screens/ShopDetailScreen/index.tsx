import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useRef, useState } from 'react'
import { FlatList, Pressable, StyleSheet, Image, View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseText from '../../components/BaseText'
import SelectBottomSheet from '../../components/BottomSheets/SelectBottomSheet'
import ItemCardAThird, { ItemCardAThirdSkeleton } from '../../components/Cards/ItemCardAThird'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RateStars from '../../components/RateStars'
import StatusBarHeightView from '../../components/StatusBarHeightView'
import DownArrowIcon from '../../components/Svgs/DownArrowIcon'
import ThinLine from '../../components/ThinLine'
import UpFab from '../../components/UpFab'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { ID } from '../../constants/types'
import { useShopItems } from '../../graphql/item'
import { usePartner } from '../../graphql/partner'
import useRefreshing from '../../hooks/useRefreshing'
import makeIdArray from '../../lib/makeIdArray'
import ShopDetailSkeleton from './ShopDetailSkeleton'

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
    const [sortIndex, setSortIndex] = useState(0)
    const sort = SORT_LIST[sortIndex]
    const [sortSheetVisible, setSortSheetVisible] = useState(false)
    const [headerUnderline, setHeaderUnderline] = useState(false)

    // DATA
    const { params } = useRoute<Route<'ShopDetail', ShopDetailScreenProps>>()
    const { data: shopData } = usePartner({ variables: { id: params.id } })
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
        navigate('ShopChat', { name: shopData?.partner.shopName, id: params.id })
    }, [shopData, params])

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
                                        source={{ uri: shopData.partner.shopImage }}
                                        style={styles.image}
                                    />
                                    <View >
                                        <BaseText style={styles.shopName} >{shopData.partner.shopName}</BaseText>
                                        <View style={styles.rateContainer} >
                                            <RateStars
                                                rate={shopData.partner.rate}
                                                spacing={3.5}
                                                emptyColor={VERY_LIGHT_GRAY}
                                            />
                                            <BaseText style={styles.rate}>{shopData.partner.rate} ({shopData.partner.rateNum})</BaseText>
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
                                <BaseText style={styles.sortText} >전체 {shopData.partner.itemNum}건</BaseText>
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