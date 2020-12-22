import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import SearchHeader from '../../components/Headers/SearchHeader'
import KeywordList from '../../components/KeywordList'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { GRAY, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import useRecentSearchKeywords from '../../hooks/useRecentSearchKeywords'
import useSearchKeyword from '../../hooks/useSearchKeyword'

const dummyRecentSearchKeywords = ['츄르', '장난감', '사료', '레이저 장난감']

const SearchScreen = () => {

    const { onClear } = useSearchKeyword()

    const { recentSearchKeywords, removeAllRecentSearchKeywords } = useRecentSearchKeywords()

    useEffect(() => {
        onClear()
    }, [])

    return (
        <ScreenLayout>
            <SearchHeader />
            <View style={styles.recentKeywordsContainer} >
                <View style={styles.recentKeywordsHeader} >
                    <BaseText style={styles.recentKeywordHeaderText} >최근 검색어</BaseText>
                    <Pressable onPress={removeAllRecentSearchKeywords} >
                        <BaseText style={styles.recentKeywordHeaderText} >전체삭제</BaseText>
                    </Pressable>
                </View>
                <KeywordList
                    data={dummyRecentSearchKeywords.map((keyword) => keyword) || []}
                />
            </View>
            <View style={styles.popularKeywordsContainer} >
                <View style={styles.popularKeywordsHeader} >
                    <BaseText style={styles.popularKeywordHeaderText} >인기 검색어</BaseText>
                </View>
                <KeywordList
                    data={dummyRecentSearchKeywords.map((keyword) => keyword) || []}
                />
            </View>
        </ScreenLayout>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    recentKeywordsContainer: {
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY
    },
    recentKeywordsHeader: {
        height: 48,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    recentKeywordHeaderText: {
        color: GRAY
    },
    popularKeywordsContainer: {

    },
    popularKeywordsHeader: {
        height: 48,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    popularKeywordHeaderText: {
        color: GRAY
    },
})
