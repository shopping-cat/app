import React, { useEffect, useState } from 'react'
import { Animated, BackHandler, NativeEventSubscription, StyleSheet, Text, View } from 'react-native'
import useLoadingModal from '../../hooks/useLoadingModal'
import LoadingView from '../View/LoadingView'

const LoadingModal = () => {

    const { visible } = useLoadingModal()

    const [opacity] = useState(new Animated.Value(0))

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: visible ? 1 : 0,
            useNativeDriver: true,
            duration: 250
        }).start()


        let backHandler: NativeEventSubscription
        if (visible) backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)

        return () => {
            backHandler && backHandler.remove()
        }
    }, [visible])


    if (!visible) return null

    return (
        <Animated.View
            style={[
                styles.container,
                { opacity }
            ]}
        >
            <LoadingView />
        </Animated.View>
    )
}

export default LoadingModal

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 99
    }
})