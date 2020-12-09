import React, { useEffect, useRef, useState } from 'react';
import { DefaultTheme, LinkingOptions, NavigationContainer, NavigationContainerRef, StackActions, Theme, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';


import HomeScreen from './HomeScreen'
import ChatScreen from './ChatScreen';
import ItemDetailScreen from './ItemDetail';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';
import SearchDetailScreen from './SearchDetailScreen';


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
        >
            <Tab.Screen name='Home' component={HomeScreen} />
            <Tab.Screen name='Chat' component={ChatScreen} />
        </Tab.Navigator>
    )
}

const linking: LinkingOptions = {
    prefixes: ['reactgraphql://'],
    config: {
        screens: {
            Login: {
                path: 'item/:id',
                parse: { id: (id) => id },
            }
        }
    }
}

const theme: Theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#fff'
    }
}

const Navigation = () => {

    const navigationRef = useRef<NavigationContainerRef>(null)

    // 로그인 상태 변경
    const onAuthStateChanged = (user: any) => {
        if (user) {
            console.log('logged in')
            setTimeout(() => {
                navigationRef?.current?.dispatch(StackActions.replace('Tab'))
            }, 200)
        } else {
            console.log('logged out')
            setTimeout(() => {
                navigationRef?.current?.dispatch(StackActions.replace('Login'))
            }, 200)
        }
    }

    // 로그인 리스너 등록
    useEffect(() => {
        const listner = auth().onAuthStateChanged(onAuthStateChanged)
        return listner
    }, [])

    return (
        <NavigationContainer
            ref={navigationRef}
            linking={linking}
            theme={theme}
        >
            <Stack.Navigator
                initialRouteName='Login'
                headerMode='none'
            >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Tab' component={TabNavigation} />
                <Stack.Screen name='ItemDetail' component={ItemDetailScreen} />
                <Stack.Screen name='Search' component={SearchScreen} />
                <Stack.Screen name='SearchDetail' component={SearchDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation