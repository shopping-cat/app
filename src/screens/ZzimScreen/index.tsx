import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BackHandler, FlatList, NativeEventSubscription, StyleSheet, View } from 'react-native'
import ZzimItemCard from '../../components/Cards/ZzimItemCard'
import CategorySelector from '../../components/CategorySelector'
import ZzimHeader from '../../components/Headers/ZzimHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import UpFab from '../../components/UpFab'
import { ID } from '../../constants/types'

const dummyItems = Array(30).fill({}).map((_, i) => ({ id: i }))

const ZzimScreen = () => {

    const { setParams } = useNavigation()

    const flatlistRef = useRef<FlatList>(null)

    const [isSelectMode, setIsSelectMode] = useState(false)
    const [selectList, setSelectList] = useState<ID[]>([])

    const onSelectAll = useCallback(() => {
        setSelectList(dummyItems.map(v => v.id))
    }, [])

    const onDelete = useCallback(() => {
        setIsSelectMode(false)
    }, [selectList])

    const onCart = useCallback(() => {
        setIsSelectMode(false)
    }, [selectList])

    useEffect(() => {
        setParams({ onSelectAll, onDelete, onCart })
    }, [])

    useEffect(() => {
        setParams({ isSelectMode }) // navigation params에 동기화
        let backHandler: NativeEventSubscription
        if (isSelectMode) {
            // 안드로이드 뒤로가기 버튼 클릭시 select mode 종료
            backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
                setIsSelectMode(false)
                return true
            })
        }
        return () => {
            // 안드로이드 뒤로가기 리스더 삭제
            backHandler && backHandler.remove()
        }
    }, [isSelectMode])

    const onSelect = useCallback((id: ID) => {
        // 이미 리스트에 포함되어있으면 삭제 없으면 추가
        if (selectList.includes(id)) { // 삭제
            setSelectList(selectList.filter(v => v !== id))
        } else { //추가
            setSelectList([id, ...selectList])
        }
    }, [selectList])

    const onSelectMode = useCallback((id?: ID) => {
        setSelectList(id !== undefined ? [id] : [])
        setIsSelectMode(true)
    }, [])

    const goUp = useCallback(() => {
        flatlistRef.current?.scrollToOffset({ offset: 0, animated: true })
    }, [])

    return (
        <View style={{ flex: 1, zIndex: 99 }} >
            <ScreenLayout>
                <ZzimHeader
                    isSelectMode={isSelectMode}
                    onComplete={() => setIsSelectMode(false)}
                    onSelectMode={onSelectMode}
                />
                <CategorySelector enable={!isSelectMode} />
                <FlatList
                    ref={flatlistRef}
                    overScrollMode='never'
                    showsVerticalScrollIndicator={false}
                    data={dummyItems}
                    numColumns={3}
                    columnWrapperStyle={styles.columnWrapperStyle}
                    style={styles.flatlist}
                    renderItem={({ item }) =>
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
