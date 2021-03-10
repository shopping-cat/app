import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import IonIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DeviceInfo from 'react-native-device-info';
import remoteConfig from '@react-native-firebase/remote-config';
import BaseText from '../../components/BaseText'
import LabelUnderLineButton from '../../components/Buttons/LabelUnderLineButton'
import TouchableScale from '../../components/Buttons/TouchableScale'
import CompanyInfo from '../../components/CompanyInfo'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RightArrowIcon from '../../components/Svgs/RightArrowIcon'
import ThinLine from '../../components/ThinLine'
import { COLOR2, LIGHT_GRAY, VERY_LIGHT_GRAY } from '../../constants/styles'
import { useIUser } from '../../graphql/user'



const MyPageScreen = () => {

    const { navigate } = useNavigation()
    const { data } = useIUser()
    const currentVersion = DeviceInfo.getVersion()
    const newVersion = remoteConfig().getString('app_version')

    const onUserInfo = useCallback(() => {
        navigate('UserInfo')
    }, [])

    const onNotification = useCallback(() => {
        navigate('Notification')
    }, [])

    const onReview = useCallback(() => {
        navigate('Review')
    }, [])

    const onCoupon = useCallback(() => {
        navigate('Coupon')
    }, [])

    const onPoint = useCallback(() => {
        navigate('Point')
    }, [])

    const onVersion = useCallback(() => {
        // 업데이트
    }, [])


    return (
        <ScreenLayout>
            <DefaultHeader disableGoBack title='마이페이지' />
            <ScrollView
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.userContainer} >
                    <Pressable
                        onPress={onUserInfo}
                        style={styles.userInfoContainer}
                    >
                        <Image
                            style={styles.userImage}
                            source={{ uri: data?.iUser.photo }}
                        />
                        <BaseText style={styles.userName} >{data?.iUser.name}</BaseText>
                        <RightArrowIcon fill={LIGHT_GRAY} />
                    </Pressable>
                    <Pressable
                        onPress={onNotification}
                        style={styles.notificationBtn}
                    >
                        <IonIcon name='notifications-outline' size={20} color={'#000'} />
                        {data && data.iUser.notificationNum > 0 && <View style={styles.notificationBadge} >
                            <BaseText style={styles.notificationBadgeText} >{data.iUser.notificationNum > 9 ? 9 : data.iUser.notificationNum}</BaseText>
                        </View>}
                    </Pressable>
                </View>
                <ThinLine />
                <View style={styles.mainOptionsContainer} >
                    <TouchableScale
                        onPress={onReview}
                        contianerStyle={styles.mainOptionBtnContainerStyle}
                        style={styles.mainOptionBtn}
                    >
                        <Icon name='comment-processing-outline' color={'#000'} size={24} />
                        <BaseText style={styles.mainOptionLabel} >리뷰</BaseText>
                    </TouchableScale>

                    <TouchableScale
                        onPress={onCoupon}
                        contianerStyle={styles.mainOptionBtnContainerStyle}
                        style={styles.mainOptionBtn}
                    >
                        <Icon name='ticket-percent-outline' color={'#000'} size={24} />
                        <BaseText style={styles.mainOptionLabel} >쿠폰</BaseText>
                    </TouchableScale>
                    <TouchableScale
                        onPress={onPoint}
                        contianerStyle={styles.mainOptionBtnContainerStyle}
                        style={styles.mainOptionBtn}
                    >
                        <Icon name='alpha-p-circle-outline' color={'#000'} size={24} />
                        <BaseText style={styles.mainOptionLabel} >포인트</BaseText>
                    </TouchableScale>
                </View>
                <ThinLine />
                <View style={styles.subOptionsContainer} >
                    <LabelUnderLineButton
                        label='주문내역'
                        onPress={() => navigate('Order')}
                    />
                    <LabelUnderLineButton
                        label='문의/건의'
                        onPress={() => navigate('Inquery')}
                    />
                    <LabelUnderLineButton
                        label='서비스 이용약관'
                        onPress={() => navigate('AgreeMent')}
                    />
                    <LabelUnderLineButton
                        label='개인정보 처리방침'
                        onPress={() => navigate('PrivacyPolicy')}
                    />
                    <LabelUnderLineButton
                        label='오픈소스 러이선스'
                        onPress={() => navigate('OpenSourceLicense')}
                    />
                    <LabelUnderLineButton
                        label={`현재 버전 ${currentVersion} (${currentVersion === newVersion ? '최신' : '업데이트 필요'})`}
                        onPress={onVersion}
                        disableArrowRight
                    />
                </View>
                <CompanyInfo />
            </ScrollView>
        </ScreenLayout >
    )
}

export default MyPageScreen

const styles = StyleSheet.create({
    userContainer: {
        width: '100%',
        paddingHorizontal: 16,
        paddingVertical: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    userImage: {
        width: 48,
        height: 48,
        borderRadius: 28
    },
    userName: {
        fontSize: 18,
        marginHorizontal: 16
    },
    notificationBtn: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: VERY_LIGHT_GRAY
    },
    notificationBadge: {
        backgroundColor: COLOR2,
        width: 18,
        height: 18,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        top: 0
    },
    notificationBadgeText: {
        fontSize: 12,
        color: '#fff'
    },
    mainOptionsContainer: {
        width: '100%',
        paddingVertical: 24,
        flexDirection: 'row'
    },
    mainOptionBtnContainerStyle: {
        flex: 1
    },
    mainOptionBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    mainOptionLabel: {
        color: '#000',
        marginTop: 8
    },
    subOptionsContainer: {
        marginVertical: 24,
        paddingHorizontal: 16
    }
})
