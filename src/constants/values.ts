import { Platform } from "react-native";

export const IS_ANDROID = Platform.OS === 'android'
export const IS_IOS = Platform.OS === 'ios'

export const ITEM_CATEGORYS = ['']
export const MAX_REVIEW_IMAGE_NUMBER = 9

export const REFUND_REASONS = [ // 환불 취소 사유
    '단순 변심',
    '배송 문제',
    '상품 문제'
]