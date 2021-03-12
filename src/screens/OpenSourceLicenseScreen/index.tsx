import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import BaseText from '../../components/Text/BaseText'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import { GRAY } from '../../constants/styles'


const oss = require('../../assets/oss.json') as Object
const data: any[] = []
const licensesKinds: any[] = []
for (const [key, value] of Object.entries(oss)) {
    data.push({ name: key, ...value })
    if (!licensesKinds.includes(value.licenses)) licensesKinds.push(value.licenses)
}


const OpenSourceLicenseScreen = () => {

    return (
        <ScreenLayout>
            <DefaultHeader title='오픈소스 라이선스' disableBtns />
            <FlatList
                data={data}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) =>
                    <View style={styles.itemContainer} >
                        <BaseText style={styles.title} >{item.name}</BaseText>
                        {item.publisher && <BaseText style={styles.content} selectable>{item.publisher}</BaseText>}
                        {item.repository && <BaseText style={styles.content} selectable >{item.repository}</BaseText>}
                        {item.licenses && <BaseText style={styles.content} selectable>{item.licenses}</BaseText>}
                    </View>
                }
            />
        </ScreenLayout>
    )
}

export default OpenSourceLicenseScreen

const styles = StyleSheet.create({
    itemContainer: {
        paddingHorizontal: 16,
        marginTop: 24
    },
    title: {
        marginBottom: 8
    },
    content: {
        color: GRAY,
        lineHeight: 20
    }
})