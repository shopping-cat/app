import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../constants/styles'
import { Category } from '../constants/types'
import BaseText from './BaseText'

const dummyCategory = [
    {
        category: '사료',
        detailCategory: ['건식사료', '주식캔', '츄르', '기타']
    },
    {
        category: '간식',
        detailCategory: ['간식캔', '간식파우치', '건조', '스낵', '수제간식', '영양제']
    },
    {
        category: '장난감',
        detailCategory: ['낚시대', '레이져', '인형']
    },
    {
        category: '용품',
        detailCategory: ['울타리', '칫솔/치약', '화장실', '스크래쳐', '정수기', '모래', '미용']
    },
    {
        category: '기타',
        detailCategory: null
    }
]

interface CategorySelectorProps {
    initCategory1?: string
    initCategory2?: string
    onChange?: (category1: Category, category2: Category) => void
    enable?: boolean
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ initCategory1, initCategory2, onChange, enable }) => {

    const [category1, setCategory1] = useState<Category>(initCategory1 || null)
    const [category2, setCategory2] = useState<Category>(initCategory2 || null)

    useEffect(() => {
        onChange && onChange(category1, category2)
    }, [category1, category2])

    const onAll = useCallback(() => {
        if (!enable) return
        setCategory1(null)
        setCategory2(null)
    }, [enable])

    const onCategory1 = useCallback((category: string) => {
        if (!enable) return
        setCategory1(category)
    }, [enable])

    const onCategory2 = useCallback((category: string) => {
        if (!enable) return
        setCategory2(category)
    }, [enable])

    return (
        <View style={styles.container} >
            <CategoryContainer
                category='전체'
                color={category1 ? GRAY : COLOR1}
                onPress={onAll}
            />
            {category1
                ?
                <CategoryContainer
                    category={category1}
                    color={COLOR1}
                />
                : <FlatList
                    contentContainerStyle={styles.flatlist}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    overScrollMode='never'
                    data={dummyCategory.map(v => v.category)}
                    keyExtractor={(item, index) => item + index}
                    nestedScrollEnabled
                    renderItem={({ item }) =>
                        <CategoryContainer
                            category={item}
                            color={category1 === item ? COLOR1 : GRAY}
                            onPress={() => onCategory1(item)}
                        />
                    }
                />}
            {category1 && <FlatList
                nestedScrollEnabled
                contentContainerStyle={styles.flatlist}
                horizontal
                showsHorizontalScrollIndicator={false}
                overScrollMode='never'
                data={dummyCategory.filter(({ category }) => category === category1)[0].detailCategory}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) =>
                    <CategoryContainer
                        category={item}
                        color={category2 === item ? COLOR2 : GRAY}
                        onPress={() => onCategory2(item)}
                    />
                }
            />}
        </View>
    )
}

CategorySelector.defaultProps = {
    enable: true
}

interface CategoryContainerProps {
    color: string
    onPress?: (category: string) => void
    category: string
}

const CategoryContainer: React.FC<CategoryContainerProps> = ({ category, onPress, color }) => {
    return <Pressable onPress={() => onPress && onPress(category)} >
        <BaseText style={[styles.category, { color }]} >{category}</BaseText>
    </Pressable>
}

export default CategorySelector

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 48,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: VERY_LIGHT_GRAY,
        borderBottomWidth: 1,
        paddingLeft: 16,
        backgroundColor: '#fff'
    },
    flatlist: {
        alignItems: 'center'
    },
    category: {
        fontSize: 16,
        marginRight: 16
    }
})