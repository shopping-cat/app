import React, { useCallback, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import BaseText from '../../components/BaseText'
import SearchHeader from '../../components/Headers/SearchHeader'
import KeywordList from '../../components/KeywordList'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { useRecentSearchKeywords, useRemoveAllSearchKeywords } from '../../graphql/user'
import useSearchKeyword from '../../hooks/useSearchKeyword'

const dummyPopularSearchKeywords = ['츄르', '장난감', '사료', '레이저 장난감'] // TODO

const SearchScreen = () => {

    const { onClear } = useSearchKeyword() // 검색어 
    const { data } = useRecentSearchKeywords() // 최신 검색어
    const [removeAllSearchKeywords] = useRemoveAllSearchKeywords()

    useEffect(() => {
        onClear()
    }, [])


    return (
        <ScreenLayout>
            <SearchHeader />
            <View style={styles.recentKeywordsContainer} >
                <View style={styles.recentKeywordsHeader} >
                    <BaseText style={styles.recentKeywordHeaderText} >최근 검색어</BaseText>
                    <Pressable onPress={() => removeAllSearchKeywords()} >
                        <BaseText style={styles.recentKeywordHeaderText} >전체삭제</BaseText>
                    </Pressable>
                </View>
                <KeywordList
                    data={data?.iUser.recentSearchKeywords.map(({ keyword }) => keyword) || []}
                />
            </View>
            <View style={styles.popularKeywordsContainer} >
                <View style={styles.popularKeywordsHeader} >
                    <BaseText style={styles.popularKeywordHeaderText} >인기 검색어</BaseText>
                </View>
                <KeywordList
                    data={dummyPopularSearchKeywords.map((keyword) => keyword) || []}
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
