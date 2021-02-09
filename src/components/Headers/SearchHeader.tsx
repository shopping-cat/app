import React, { useCallback } from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import { COLOR1, GRAY, LIGHT_COLOR1 } from '../../constants/styles'
import { useNavigation } from '@react-navigation/native'
import useSearchKeyword from '../../hooks/useSearchKeyword'
import BackArrowIcon from '../Svgs/BackArrowIcon'
import BaseText from '../BaseText'
import CloseIcon from '../Svgs/CloseIcon'

interface SearchHeaderProps {
    editable?: boolean
}


const SearchHeader: React.FC<SearchHeaderProps> = ({ editable }) => {

    const { navigate, goBack } = useNavigation()
    const { searchKeyword, onChange, onClear } = useSearchKeyword()

    const onSearch = useCallback(() => {
        if (!editable) return
        if (searchKeyword.length === 0) return
        navigate('SearchDetail', { keyword: searchKeyword })
    }, [searchKeyword])

    const onClearBtn = useCallback(() => {
        onClear()
        if (!editable) goBack()
    }, [editable])

    return (
        <View style={styles.container} >
            <Pressable
                onPress={goBack}
                style={styles.backContainer}
            >
                <BackArrowIcon fill={COLOR1} />
            </Pressable>
            <View
                style={styles.inputContainer}
            >
                <Icon2 name='search' size={16} color={GRAY} />
                {editable ?
                    <TextInput
                        placeholder='검색어를 입력해주세요!'
                        editable={editable}
                        style={styles.input}
                        maxLength={100}
                        onSubmitEditing={onSearch}
                        value={searchKeyword}
                        onChangeText={onChange}
                        autoFocus={editable}
                        placeholderTextColor={GRAY}
                    />
                    :
                    <Pressable
                        onPress={goBack}
                        style={styles.keywordContainer}
                    >
                        <BaseText numberOfLines={1}>{searchKeyword}</BaseText>
                    </Pressable>
                }
                <Pressable
                    onPress={onClearBtn}
                    style={styles.inputClearBtn}
                >
                    <CloseIcon />
                </Pressable>
            </View>
        </View>
    )
}

SearchHeader.defaultProps = {
    editable: true
}

export default SearchHeader

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 16
    },
    backContainer: {
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputContainer: {
        flex: 1,
        height: 32,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: LIGHT_COLOR1,
        borderRadius: 16
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        color: '#000',
        paddingVertical: 0,
        fontFamily: 'BMJUA'
    },
    keywordContainer: {
        flex: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        height: '100%'
    },
    inputClearBtn: {
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})