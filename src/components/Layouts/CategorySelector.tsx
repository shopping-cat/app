import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { COLOR1, COLOR2, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { Category } from '../../constants/types'
import { CATEGORY } from '../../constants/values'
import BaseText from '../Text/BaseText'


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
                    data={CATEGORY.map(v => v.category)}
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
                data={CATEGORY.filter(({ category }) => category === category1)[0].detailCategory}
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
    return <Pressable style={styles.categoryContainer} onPress={() => onPress && onPress(category)} >
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
        alignItems: 'center',
    },
    category: {
        fontSize: 16,
        marginRight: 16
    },
    categoryContainer: {
        height: 47,
        justifyContent: 'center'
    }
})