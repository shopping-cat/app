import { Platform } from "react-native";

export const IS_ANDROID = Platform.OS === 'android'
export const IS_IOS = Platform.OS === 'ios'

export const ITEM_CATEGORYS = ['']
export const MAX_REVIEW_IMAGE_NUMBER = 9

export const REFUND_REASONS = [ // 환불 사유
    '단순 변심',
    '배송 문제',
    '상품 문제'
]

export const EXCHANGE_REASON = [ // 교환 사유
    '단순 변심',
    '배송 문제',
    '상품 문제'
]

export const CASH_RECEIPT_TYPES = ['개인소득공제', '법인지출증빙', '미신청']
export type CASH_RECEIPT_TYPE = '개인소득공제' | '법인지출증빙' | '미신청'
export const PAY_METHODS = ['카드결제', '무통장입금', '휴대폰결제']
export type PAY_METHOD = '카드결제' | '무통장입금' | '휴대폰결제'
export const BANKS = ['우체국 (123124-2-4124-12)', '농협 (12353-512525-512)', '우리 (15025-125251-25125)', '우채국 (25125-2512-12-2)', '우체국 (123124-2-4124-12)', '농협 (12353-512525-512)', '우리 (15025-125251-25125)', '우채국 (25125-2512-12-2)']