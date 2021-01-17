import React, { useEffect, useRef } from 'react';
import { DefaultTheme, LinkingOptions, NavigationContainer, NavigationContainerRef, StackActions, Theme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TabNavigationTabBar from '../components/TabNavigationTabBar';


import HomeScreen from './HomeScreen'
import CategoryScreen from './CategoryScreen';
import ZzimScreen from './ZzimScreen';
import MyPageScreen from './MyPageScreen';
import ItemDetailScreen from './ItemDetailScreen';
import ItemReviewScreen from './ItemReviewScreen';
import LoginScreen from './LoginScreen';
import SearchScreen from './SearchScreen';
import SearchDetailScreen from './SearchDetailScreen';
import ShopDetailScreen from './ShopDetailScreen';
import ShopChatScreen from './ShopChatScreen';
import ImageViewScreen from './ImageViewScreen';
import CartScreen from './CartScreen';
import PaymentScreen from './PaymentScreen';
import AddressScreen from './AddressScreen';
import AddressSearchScreen from './AddressSearchScreen'
import RefundAccountScreen from './RefundAccountScreen';
import PointSelectScreen from './PointSelectScreen';
import CouponSelectScreen from './CouponSelectScreen';
import PaymentResultScreen from './PaymentResultScreen';
import CategoryScreenSortSheet from './CategoryScreen/CategoryScreenSortSheet';
import InqueryScreen from './InqueryScreen';
import UserInfoScreen from './UserInfoScreen';
import UserInfoProfileModifyScreen from './UserInfoProfileModifyScreen';
import DeleteAccountScreen from './DeleteAccountScreen';



const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()


const TabNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            tabBar={(props) => <TabNavigationTabBar {...props} />}
        >
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarLabel: '홈',
                    tabBarIcon: (({ color }) => <Icon size={24} name='home-outline' color={color} />)
                }}
            />
            <Tab.Screen
                name='Category'
                component={CategoryScreen}
                options={{
                    tabBarLabel: '카테고리',
                    tabBarIcon: (({ color }) => <Icon size={24} name='menu' color={color} />)
                }}
            />
            <Tab.Screen
                name='Zzim'
                component={ZzimScreen}
                options={{
                    tabBarLabel: '찜',
                    tabBarIcon: (({ color }) => <Icon size={24} name='heart-outline' color={color} />)
                }}
            />
            <Tab.Screen
                name='MyPage'
                component={MyPageScreen}
                options={{
                    tabBarLabel: '마이페이지',
                    tabBarIcon: (({ color }) => <Icon size={24} name='account-outline' color={color} />)
                }}
            />
        </Tab.Navigator>
    )
}

const linking: LinkingOptions = {
    prefixes: ['shoppingcat://'],
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
            // timeout 없으면 앱 처음 실행시에 NavigationContainer가 생성이 안되있어서 오류남 (가능하다면 수정 바람)
            setTimeout(() => {
                // 중복 네비게이트 방지
                const route = navigationRef?.current?.getCurrentRoute()
                if (route?.name === 'Home') return
                // navigationRef.current?.reset({})
                navigationRef?.current?.dispatch(StackActions.replace('Tab'))
            }, 200)
        } else {
            console.log('logged out')
            // timeout 없으면 앱 처음 실행시에 NavigationContainer가 생성이 안되있어서 오류남 (가능하다면 수정 바람)
            setTimeout(() => {
                // 중복 네비게이트 방지
                const route = navigationRef?.current?.getCurrentRoute()
                if (route?.name === 'Login') return
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
                screenOptions={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
            >
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Tab' component={TabNavigation} />
                <Stack.Screen name='ItemDetail' component={ItemDetailScreen} />
                <Stack.Screen name='ItemReview' component={ItemReviewScreen} />
                <Stack.Screen name='Search' component={SearchScreen} />
                <Stack.Screen name='SearchDetail' component={SearchDetailScreen} />
                <Stack.Screen name='ShopDetail' component={ShopDetailScreen} />
                <Stack.Screen name='ShopChat' component={ShopChatScreen} />
                <Stack.Screen name='ImageView' component={ImageViewScreen} />
                <Stack.Screen name='Cart' component={CartScreen} />
                <Stack.Screen name='Payment' component={PaymentScreen} />
                <Stack.Screen name='Address' component={AddressScreen} />
                <Stack.Screen name='AddressSearch' component={AddressSearchScreen} />
                <Stack.Screen name='RefundAccount' component={RefundAccountScreen} />
                <Stack.Screen name='PointSelect' component={PointSelectScreen} />
                <Stack.Screen name='CouponSelect' component={CouponSelectScreen} />
                <Stack.Screen name='PaymentResult' component={PaymentResultScreen} />
                <Stack.Screen name='Inquery' component={InqueryScreen} />
                <Stack.Screen name='UserInfo' component={UserInfoScreen} />
                <Stack.Screen name='UserInfoProfileModify' component={UserInfoProfileModifyScreen} />
                <Stack.Screen name='DeleteAccount' component={DeleteAccountScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const NavigationWrapper = () => {
    return (
        <>
            <Navigation />
            <CategoryScreenSortSheet />
        </>
    )
}

export default NavigationWrapper