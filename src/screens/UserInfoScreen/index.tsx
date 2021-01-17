import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseText from '../../components/BaseText'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RightArrowIcon from '../../components/Svgs/RightArrowIcon'
import { COLOR1, GRAY, VERY_LIGHT_GRAY, VERY_VERY_LIGHT_GRAY } from '../../constants/styles'
import useAuth from '../../hooks/useAuth'

const dummyImage = 'https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_283/5-2-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg'
const dummyEmail = 'shoppingcat@gmail.com'
const dummyDeliveryInfo = {
    address: '부상 기장군 기장읍 백동길 24-4',
    addressDetail: '신림아파트 102호 1202호',
    phone: '01023958153',
    name: '홍길동',
    postCode: '46076'
}
const dummyRefundAccount = {
    name: '홍길동',
    accountNumber: '0294109249022',
    bank: '농협'
}

const UserInfoScreen = () => {

    const { navigate } = useNavigation()
    const { logout } = useAuth()

    const deliveryInfo = `${dummyDeliveryInfo.name} ${dummyDeliveryInfo.phone}\n${dummyDeliveryInfo.address}\n${dummyDeliveryInfo.addressDetail}`
    const refundAccountInfo = `${dummyRefundAccount.name} | ${dummyRefundAccount.bank} ${dummyRefundAccount.accountNumber}`

    return (
        <ScreenLayout>
            <DefaultHeader disableBtns title='회원정보' />
            <ScrollView style={styles.container} >
                <Pressable
                    onPress={() => navigate('UserInfoProfileModify')}
                    style={styles.imageContainer}
                >
                    <Image
                        style={styles.image}
                        source={{ uri: dummyImage }}
                    />
                    <View style={styles.imageBadge} >
                        <Icon name='pencil' size={14} color={COLOR1} />
                    </View>
                </Pressable>
                <View style={styles.contentContainer} >
                    <View style={styles.contentLeftContainer} >
                        <BaseText style={styles.title} >이메일</BaseText>
                        <BaseText style={styles.content} >{dummyEmail}</BaseText>
                    </View>
                </View>
                <Pressable
                    onPress={() => navigate('Address')}
                    style={styles.contentContainer}
                >
                    <View style={styles.contentLeftContainer} >
                        <BaseText style={styles.title} >배송지 정보</BaseText>
                        <BaseText style={styles.content} >{deliveryInfo}</BaseText>
                    </View>
                    <View style={styles.contentBtn} >
                        <RightArrowIcon fill={GRAY} />
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => navigate('RefundAccount')}
                    style={styles.contentContainer}
                >
                    <View style={styles.contentLeftContainer} >
                        <BaseText style={styles.title} >환불계좌</BaseText>
                        <BaseText style={styles.content} >{refundAccountInfo}</BaseText>
                    </View>
                    <View style={styles.contentBtn} >
                        <RightArrowIcon fill={GRAY} />
                    </View>
                </Pressable>
                <Pressable
                    onPress={logout}
                    style={styles.underLineBtn}
                >
                    <View style={styles.underLineBtnLeft} >
                        <BaseText style={styles.underLineBtnLable} >로그아웃</BaseText>
                    </View>
                    <View style={styles.underLineArrowRight} >
                        <RightArrowIcon fill={GRAY} />
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => navigate('DeleteAccount')}
                    style={styles.underLineBtn}
                >
                    <View style={styles.underLineBtnLeft} >
                        <BaseText style={styles.underLineBtnLable} >회원탈퇴</BaseText>
                    </View>
                    <View style={styles.underLineArrowRight} >
                        <RightArrowIcon fill={GRAY} />
                    </View>
                </Pressable>
            </ScrollView>
        </ScreenLayout>
    )
}

export default UserInfoScreen

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    imageContainer: {
        alignSelf: 'center',
        marginVertical: 24
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40
    },
    imageBadge: {
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: VERY_VERY_LIGHT_GRAY,
        position: 'absolute',
        right: 0,
        bottom: 0
    },
    contentContainer: {
        flexDirection: 'row',
        marginBottom: 24
    },
    contentLeftContainer: {
        flex: 1,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 16,
        marginBottom: 16
    },
    content: {
        fontSize: 14,
        color: GRAY,
        lineHeight: 24
    },
    contentBtn: {
        width: 56,
        height: 56,
        alignItems: 'flex-end'
    },
    underLineBtn: {
        width: '100%',
        height: 56,
        marginBottom: 16,
        flexDirection: 'row',
        alignItems: 'center'
    },
    underLineBtnLeft: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: VERY_LIGHT_GRAY,
        paddingHorizontal: 16,
        height: '100%',
        justifyContent: 'center'
    },
    underLineBtnLable: {
        fontSize: 16,
        color: GRAY
    },
    underLineArrowRight: {
        width: 56,
        height: 56,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})
