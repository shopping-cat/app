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
export const PAY_METHODS = ['카드결제', '가상계좌', '휴대폰결제']
export type PAY_METHOD = '카드결제' | '가상계좌' | '휴대폰결제'
export const V_REFUND_BANKS = ['KB국민은행', 'SC제일은행', '경남은행', '광주은행', '기업은행', '농협', '대구은행', '부산은행', '산업은행', '새마을금고', '수협', '신한은행', '신협', '외환은행', '우리은행', '우체국', '전북은행', '카카오뱅크', '케이뱅크', '하나은행(서울은행)', '한국씨티은행(한미은행)']

export const DELIVERY_MEMOS = [
    '없음',
    '직접입력',
    '문 앞에 놓아주세요',
    '경비(관리)실에 맡겨주세요',
    '직접수령, 부재 시 문 앞에 놓아주세요',
    '벨 누르지말고 배송 완료 후 문자주세요',
    '배송 전에 미리 연락주세요'
]