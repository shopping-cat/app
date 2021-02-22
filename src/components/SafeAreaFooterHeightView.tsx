import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeAreaFooterHeightView = () => {

    const { bottom } = useSafeAreaInsets()

    return (
        <View style={{ height: bottom }} />
    )
}

export default SafeAreaFooterHeightView