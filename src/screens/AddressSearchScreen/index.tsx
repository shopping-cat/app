import { Route, useNavigation, useRoute } from '@react-navigation/native'
import React, { useCallback, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import Postcode, { OnCompleteParams } from 'react-native-daum-postcode'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'

interface AddressSearchScreenProps {
    setPostCode: (t: string) => void
    setAddress: (t: string) => void
}

const AddressSearchScreen = () => {

    const { goBack } = useNavigation()
    const { params } = useRoute<Route<string, AddressSearchScreenProps>>()

    useEffect(() => {
        if (!params?.setPostCode || !params?.setAddress) goBack()
    }, [])

    const onSelected = useCallback((data: OnCompleteParams) => {
        params?.setAddress(data.address)
        params?.setPostCode(data.zonecode.toString())
        goBack()
    }, [params])

    const onError = useCallback(() => {
        // Toast
        goBack()
    }, [])

    return (
        <ScreenLayout>
            <DefaultHeader title='우편번호 검색' disableBtns />
            <Postcode
                style={styles.postCode}
                onError={onError}
                onSelected={onSelected}
            />
        </ScreenLayout>
    )
}

export default AddressSearchScreen

const styles = StyleSheet.create({
    postCode: {
        flex: 1
    }
})
