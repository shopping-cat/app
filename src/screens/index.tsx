import React, { useEffect, useRef } from 'react';
import { DefaultTheme, LinkingOptions, NavigationContainer, NavigationContainerRef, StackActions, Theme } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import TabNavigationTabBar from '../components/Tab/TabNavigationTabBar';
import { useApolloClient } from '@apollo/client';
import { I_USER, IUserData } from '../graphql/user';

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
import PointScreen from './PointScreen';
import CouponScreen from './CouponScreen';
import ReviewScreen from './ReviewScreen';
import ReviewPostScreen from './ReviewPostScreen';
import GlobalSelectBottomSheet from '../components/BottomSheets/GlobalSelectBottomSheet';
import ReviewModifyScreen from './ReviewModifyScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import AgreeMentScreen from './AgreeMentScreen';
import OpenSourceLicenseScreen from './OpenSourceLicenseScreen';
import NotificationScreen from './NotificationScreen';
import OrderScreen from './OrderScreen';
import OrderDetailScreen from './OrderDetailScreen';
import OrderCancelGuideScreen from './OrderCancelGuideScreen'
import RefundScreen from './RefundScreen';
import RefundDetailScreen from './RefundDetailScreen';
import RefundResultScreen from './RefundResultScreen';
import ExchangeScreen from './ExchangeScreen';
import ExchangeDetailScreen from './ExchangeDetailScreen';
import ExchangeResultScreen from './ExchangeResultScreen';
import PGScreen from './PGScreen'
import Toast from '../components/Toast/Toast';
import ProfileRegistScreen from './ProfileRegistScreen';
import UserCertificationScreen from './UserCertificationScreen';
import OrderShopCancelDetailScreen from './OrderShopCancelDetailScreen';
import DeliveryDetailScreen from './DeliveryDetailScreen';



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
    const client = useApolloClient()

    // 로그인 상태 변경
    const onAuthStateChanged = async (user: any) => {
        try {
            if (user) {
                console.log('logged in')
                // timeout 없으면 앱 처음 실행시에 NavigationContainer가 생성이 안되있어서 오류남 (가능하다면 수정 바람)
                const { data } = await client.query<IUserData>({ query: I_USER, fetchPolicy: 'network-only', })
                const route = navigationRef?.current?.getCurrentRoute()
                if (!data.iUser.name) { // 이름정보가 없으면 기본정보입력화면으로 전환
                    if (route?.name === 'ProfileRegist') return
                    navigationRef.current?.reset({
                        index: 0,
                        routes: [{ name: 'ProfileRegist' }]
                    })
                }
                else {
                    if (route?.name === 'Home') return
                    navigationRef.current?.reset({
                        index: 0,
                        routes: [{ name: 'Tab' }]
                    })
                }
            } else {
                console.log('logged out')
                const route = navigationRef?.current?.getCurrentRoute()
                if (route?.name === 'Login') return
                navigationRef.current?.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                })
            }
        } catch (error) {
            console.error(error)
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
                <Stack.Screen name='Point' component={PointScreen} />
                <Stack.Screen name='Coupon' component={CouponScreen} />
                <Stack.Screen name='Review' component={ReviewScreen} />
                <Stack.Screen name='ReviewPost' component={ReviewPostScreen} />
                <Stack.Screen name='ReviewModify' component={ReviewModifyScreen} />
                <Stack.Screen name='PrivacyPolicy' component={PrivacyPolicyScreen} />
                <Stack.Screen name='AgreeMent' component={AgreeMentScreen} />
                <Stack.Screen name='OpenSourceLicense' component={OpenSourceLicenseScreen} />
                <Stack.Screen name='Notification' component={NotificationScreen} />
                <Stack.Screen name='Order' component={OrderScreen} />
                <Stack.Screen name='OrderDetail' component={OrderDetailScreen} />
                <Stack.Screen name='OrderCancelGuide' component={OrderCancelGuideScreen} />
                <Stack.Screen name='Refund' component={RefundScreen} />
                <Stack.Screen name='RefundDetail' component={RefundDetailScreen} />
                <Stack.Screen name='RefundResult' component={RefundResultScreen} />
                <Stack.Screen name='Exchange' component={ExchangeScreen} />
                <Stack.Screen name='ExchangeDetail' component={ExchangeDetailScreen} />
                <Stack.Screen name='ExchangeResult' component={ExchangeResultScreen} />
                <Stack.Screen name='OrderShopCancelDetail' component={OrderShopCancelDetailScreen} />
                <Stack.Screen name='DeliveryDetail' component={DeliveryDetailScreen} />
                <Stack.Screen name='PG' component={PGScreen} />
                <Stack.Screen name='ProfileRegist' component={ProfileRegistScreen} />
                <Stack.Screen name='UserCertification' component={UserCertificationScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const NavigationWrapper = () => {
    return (
        <>
            <Navigation />
            <CategoryScreenSortSheet />
            <GlobalSelectBottomSheet />
            <Toast />
        </>
    )
}

export default NavigationWrapper