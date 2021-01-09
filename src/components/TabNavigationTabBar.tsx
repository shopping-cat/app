import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../constants/styles'
import ZzimScreenSelectModeFooter from '../screens/ZzimScreen/ZzimScreenSelectModeFooter'
import BaseText from './BaseText'
import TouchableScale from './Buttons/TouchableScale'

const TabNavigationTabBar: React.FC<BottomTabBarProps<BottomTabBarOptions>> = ({ state, navigation, descriptors }) => {

    const { bottom } = useSafeAreaInsets()

    return (
        <>
            <View style={[styles.container, { height: 56 + bottom, paddingBottom: bottom }]} >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key]
                    const label = options.tabBarLabel as string
                    const isFocused = state.index === index
                    const Icon: any = options.tabBarIcon


                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                        navigation.navigate(route.name)
                    };

                    return (
                        <TouchableScale
                            key={label}
                            contianerStyle={styles.btn}
                            onPress={onPress}
                            style={styles.btn}
                        >
                            <Icon color={isFocused ? COLOR1 : GRAY} />
                            <BaseText style={[styles.label, { color: isFocused ? COLOR1 : GRAY }]} >{label}</BaseText>
                        </TouchableScale>
                    )
                })}
            </View>
            <ZzimScreenSelectModeFooter
                //@ts-ignore
                visible={state.index === 2 && state.routes[2].params?.isSelectMode}
                //@ts-ignore
                onSelectAll={state.routes[2].params?.onSelectAll}
                //@ts-ignore
                onCart={state.routes[2].params?.onCart}
                //@ts-ignore
                onDelete={state.routes[2].params?.onDelete}
            />
        </>
    )
}

export default TabNavigationTabBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderTopWidth: 1,
        borderTopColor: VERY_LIGHT_GRAY,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 12,
        marginTop: 6
    }
})