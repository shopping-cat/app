import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BackHandler, FlatList, NativeEventSubscription, StyleSheet, View } from 'react-native'
import { ItemCardAThirdSkeleton } from '../../components/Cards/ItemCardAThird'
import ZzimItemCard from '../../components/Cards/ZzimItemCard'
import CategorySelector from '../../components/Layouts/CategorySelector'
import ZzimHeader from '../../components/Headers/ZzimHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import UpFab from '../../components/Buttons/UpFab'
import { useZzimItems } from '../../graphql/item'
import useRefreshing from '../../hooks/useRefreshing'
import useZzimFooter from '../../hooks/useZzimFooter'
import makeIdArray from '../../lib/makeIdArray'
import EmptyView from '../../components/View/EmptyView'

const ZzimScreen = () => {

    const flatlistRef = useRef<FlatList>(null)

    const [category, setCategory] = useState('전체')
    const { data, loading, fetchMore, refetch } = useZzimItems({ variables: { category } })
    const { onRefresh, refreshing } = useRefreshing(refetch)
    const filteredItems = data ? data.zzimItems.filter(v => v.isILiked) : []
    const { isSelectMode, onSelectMode, onSelect, selectList, onClose } = useZzimFooter(filteredItems)
    const isEmpty = data && filteredItems.length === 0


    useEffect(() => {
        let backHandler: NativeEventSubscription
        if (isSelectMode) {
            // 안드로이드 뒤로가기 버튼 클릭시 select mode 종료
            backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                onClose()
                return true
            })
        }
        return () => {
            // 안드로이드 뒤로가기 리스더 삭제
            backHandler && backHandler.remove()
        }
    }, [isSelectMode])


    const goUp = useCallback(() => {
        flatlistRef.current?.scrollToOffset({ offset: 0 })
    }, [])

    return (
        <View style={{ flex: 1, zIndex: 99 }} >
            <ScreenLayout>
                <ZzimHeader
                    isSelectMode={isSelectMode}
                    onComplete={onClose}
                    onSelectMode={onSelectMode}
                />
                <CategorySelector enable={!isSelectMode} onChange={(c1, c2) => setCategory(c2 || c1 || '전체')} />
                <View style={{ flex: 1 }} >
                    {isEmpty && <EmptyView />}
                    <FlatList
                        ref={flatlistRef}
                        refreshing={refreshing}
                        onRefresh={!isSelectMode ? onRefresh : undefined}
                        onEndReached={() => fetchMore({
                            variables: { offset: filteredItems.length, limit: 3 }
                        })}
                        overScrollMode='never'
                        showsVerticalScrollIndicator={false}
                        numColumns={3}
                        columnWrapperStyle={styles.columnWrapperStyle}
                        style={styles.flatlist}
                        data={loading ? makeIdArray(9) : filteredItems}
                        renderItem={({ item }) => loading ? <ItemCardAThirdSkeleton /> :
                            <ZzimItemCard
                                {...item}
                                isSelectMode={isSelectMode}
                                onSelect={onSelect}
                                onSelectMode={onSelectMode}
                                isSelected={selectList.includes(item.id)}
                            />
                        }
                        ListFooterComponent={<View style={styles.footer} />}
                    />
                </View>

                <UpFab
                    onPress={goUp}
                    animation={false}
                />
            </ScreenLayout>
        </View>
    )
}

export default ZzimScreen

const styles = StyleSheet.create({
    flatlist: {
        paddingTop: 24
    },
    footer: {
        height: 24
    },
    columnWrapperStyle: {
        paddingLeft: 8
    }
})
