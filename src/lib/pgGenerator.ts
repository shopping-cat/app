import { IMP_PG } from "iamport-react-native";
import { EASY_PAYMENT_METHOD, PAY_METHOD } from "../constants/values";

const pgGenerator = (method: PAY_METHOD, easyMethod: EASY_PAYMENT_METHOD | null = null): IMP_PG => {
    if (method === '간편결제') {
        if (easyMethod === '토스') return 'tosspay'
        if (easyMethod === '카카오페이') return 'kakaopay'
    }
    return 'danal_tpay'
}

export default pgGenerator