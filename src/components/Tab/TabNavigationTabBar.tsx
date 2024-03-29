import { BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { COLOR1, GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import useZzimFooter from '../../hooks/useZzimFooter'
import ZzimScreenSelectModeFooter from '../../screens/ZzimScreen/ZzimScreenSelectModeFooter'
import BaseText from '../Text/BaseText'
import TouchableScale from '../Buttons/TouchableScale'
import useAuth from '../../hooks/useAuth'

const TabNavigationTabBar: React.FC<BottomTabBarProps<BottomTabBarOptions>> = ({ state, navigation, descriptors }) => {

    const { bottom } = useSafeAreaInsets()
    const { isLoggedIn } = useAuth()
    const { onCart, onDelete, onSelectAll, isSelectMode } = useZzimFooter()

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
                            if (route.name === 'Zzim' && !isLoggedIn) navigation.navigate('Login')
                            else navigation.navigate(route.name)
                        }

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
                visible={state.index === 2 && isSelectMode}
                onSelectAll={onSelectAll}
                onCart={onCart}
                onDelete={onDelete}
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