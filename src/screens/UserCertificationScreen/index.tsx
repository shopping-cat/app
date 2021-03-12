import IMP, { CallbackRsp } from 'iamport-react-native'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { IAMPORT_CODE } from '../../../env'
import LoadingView from '../../components/View/LoadingView'
import DefaultHeader from '../../components/Headers/DefaultHeader'
import ScreenLayout from '../../components/Layouts/ScreenLayout'

const UserCertificationScreen = () => {

    const callBack = (rsp: CallbackRsp) => {
        console.log(rsp)
    }

    return (
        <ScreenLayout>
            <DefaultHeader disableBtns title='본인인증' />
            <IMP.Certification
                userCode={IAMPORT_CODE}
                data={{
                    merchant_uid: `${new Date().getTime()}`
                }}
                loading={<LoadingView />}
                callback={callBack}
            />
        </ScreenLayout>
    )
}

export default UserCertificationScreen

const styles = StyleSheet.create({})
