import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BaseText from '../../components/Text/BaseText'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'
import RightArrowIcon from '../../components/Svgs/RightArrowIcon'
import { COLOR1, GRAY, VERY_LIGHT_GRAY, VERY_VERY_LIGHT_GRAY } from '../../constants/styles'
import { useIUser } from '../../graphql/user'
import useAuth from '../../hooks/useAuth'



const UserInfoScreen = () => {

    const { navigate } = useNavigation()
    const { logout } = useAuth()
    const { data } = useIUser()

    const certificatedInfo = `${data?.iUser.certificatedInfo?.name} | ${data?.iUser.certificatedInfo?.phone}`
    const deliveryInfo = `${data?.iUser.deliveryInfo?.name} ${data?.iUser.deliveryInfo?.phone}\n${data?.iUser.deliveryInfo?.address}\n${data?.iUser.deliveryInfo?.addressDetail}`
    const refundAccountInfo = `${data?.iUser.refundBankAccount?.ownerName} | ${data?.iUser.refundBankAccount?.bankName} ${data?.iUser.refundBankAccount?.accountNumber}`

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
                        source={{ uri: data?.iUser.photo }}
                    />
                    <View style={styles.imageBadge} >
                        <Icon name='pencil' size={14} color={COLOR1} />
                    </View>
                </Pressable>
                <View style={styles.contentContainer} >
                    <View style={styles.contentLeftContainer} >
                        <BaseText style={styles.title} >이메일</BaseText>
                        <BaseText style={styles.content} >{data?.iUser.userDetail.email}</BaseText>
                    </View>
                </View>
                <Pressable
                    onPress={() => navigate('UserCertification')}
                    style={styles.contentContainer}
                >
                    <View style={styles.contentLeftContainer} >
                        <BaseText style={styles.title} >본인인증</BaseText>
                        <BaseText style={styles.content} >{data?.iUser.certificatedInfo ? certificatedInfo : '인증해주세요'}</BaseText>
                    </View>
                    <View style={styles.contentBtn} >
                        <RightArrowIcon fill={GRAY} />
                    </View>
                </Pressable>
                <Pressable
                    onPress={() => navigate('Address')}
                    style={styles.contentContainer}
                >
                    <View style={styles.contentLeftContainer} >
                        <BaseText style={styles.title} >배송지 정보</BaseText>
                        <BaseText style={styles.content} >{data?.iUser.deliveryInfo ? deliveryInfo : '입력해주세요'}</BaseText>
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
                        <BaseText style={styles.content} >{data?.iUser.refundBankAccount ? refundAccountInfo : '입력해주세요'}</BaseText>
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
