import { EASY_PAYMENT_METHOD, PAY_METHOD } from "../constants/values";

const paymentMethodGenerator = (method: PAY_METHOD, easyMethod: EASY_PAYMENT_METHOD | null = null) => {
    if (method === '카드결제') return 'card'
    if (method === '가상계좌') return 'vbank'
    if (method === '휴대폰결제') return 'phone'
    if (method === '간편결제') {
        if (easyMethod === '토스') return 'tosspay'
        if (easyMethod === '카카오페이') return 'kakaopay'
    }
}

export default paymentMethodGenerator