import { EASY_PAYMENT_METHOD, PAY_METHOD } from "../constants/values";

const paymentMethodGenerator = (method: PAY_METHOD) => {
    if (method === '카드결제') return 'card'
    // if (method === '가상계좌') return 'vbank'
    // if (method === '휴대폰결제') return 'phone'
    if (method === '토스') return 'tosspay'
    if (method === '카카오페이') return 'kakaopay'
    if (method === '페이코') return 'payco'
    return 'card'
}

export default paymentMethodGenerator