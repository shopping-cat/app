import React, { useEffect } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import SearchHeader from '../../components/Headers/SearchHeader'
import KeywordList from '../../components/KeywordList'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import useRecentSearchKeywords from '../../hooks/useRecentSearchKeywords'
import useSearchKeyword from '../../hooks/useSearchKeyword'

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
                    <Text style={styles.recentKeywordHeaderText} >Recent Keywords</Text>
                    <Pressable onPress={removeAllRecentSearchKeywords} >
                        <Text style={styles.recentKeywordHeaderText} >Remove all</Text>
                    </Pressable>
                </View>
                <KeywordList
                    data={recentSearchKeywords.map((keyword) => keyword) || []}
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
        color: LIGHT_GRAY
    }
})
