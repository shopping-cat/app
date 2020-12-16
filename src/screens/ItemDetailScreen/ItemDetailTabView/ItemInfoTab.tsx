import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const uri = 'https://thumbnail10.coupangcdn.com/thumbnails/remote/q89/image/retail/images/76640298191095-3e3f2e35-88e9-4b27-8e64-1dab8faed75e.jpg'

const ItemInfoTab = () => {
    return (
        <View style={{}} >
            <Image style={{ width: '100%', height: 1000 }} source={{ uri }} />
        </View>
    )
}

export default ItemInfoTab

const styles = StyleSheet.create({})
