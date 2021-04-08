import { Route, useRoute } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import WebView from 'react-native-webview'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import LoadingView from '../../components/View/LoadingView'
import { useEvent } from '../../graphql/event'

interface EventDetailProps {
    id: number
}

const EventDetail = () => {
    const { params } = useRoute<Route<'Evnet', EventDetailProps>>()
    const { data } = useEvent({ variables: { id: params.id } })
    const { bottom } = useSafeAreaInsets()

    return (
        <ScreenLayout>
            <DefaultHeader title='이벤트' />
            {!data && <LoadingView />}
            {data &&
                <WebView
                    source={{ html: data.event.html }}
                />
            }

        </ScreenLayout>
    )
}

export default EventDetail

const styles = StyleSheet.create({})
