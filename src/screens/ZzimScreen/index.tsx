import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BackHandler, FlatList, NativeEventSubscription, StyleSheet, View } from 'react-native'
import { ItemCardAThirdSkeleton } from '../../components/Cards/ItemCardAThird'
import ZzimItemCard from '../../components/Cards/ZzimItemCard'
import CategorySelector from '../../components/CategorySelector'
import ZzimHeader from '../../components/Headers/ZzimHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import UpFab from '../../components/UpFab'
import { useZzimItems } from '../../graphql/item'
import useRefreshing from '../../hooks/useRefreshing'
import useZzimFooter from '../../hooks/useZzimFooter'
import makeIdArray from '../../lib/makeIdArray'

const ZzimScreen = () => {

    const flatlistRef = useRef<FlatList>(null)

    const [category, setCategory] = useState('전체')
    const { data, loading, fetchMore, refetch } = useZzimItems({ variables: { category } })
    const { onRefresh, refreshing } = useRefreshing(refetch)
    const { isSelectMode, onSelectMode, onSelect, selectList, onClose } = useZzimFooter(data?.zzimItems || [])


    useEffect(() => {
        // setParams({ isSelectMode }) // navigation params에 동기화
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
        flatlistRef.current?.scrollToOffset({ offset: 0, animated: true })
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
                <FlatList
                    ref={flatlistRef}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    onEndReached={() => fetchMore({
                        variables: { offset: data?.zzimItems.length }
                    })}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    numColumns={3}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    style={styles.flatlist}
                    data={loading ? makeIdArray(9) : data?.zzimItems}
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
