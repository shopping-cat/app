import { Platform } from "react-native";

export const IS_ANDROID = Platform.OS === 'android'
export const IS_IOS = Platform.OS === 'ios'
export const APPLE_APP_ID = '1564198692'
export const ANDROID_PACKAGE_NAME = 'com.shoppingcat.userapp'
export const KAKAO_CHANNEL_USER = 'http://pf.kakao.com/_ILHqs/chat'
export const KAKAO_CHANNEL_SELLERS = 'http://pf.kakao.com/_YcPRs/chat'

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

export const CATEGORY = [
    {
        category: '사료',
        detailCategory: ['키튼', '어덜트', '시니어', '전연령', '에어/동결사료', '건식사료', '주식캔', '파우치', '기타']
    },
    {
        category: '간식',
        detailCategory: ['간식캔', '수제간식', '간식파우치', '동결/건조', '캣닢/캣그라스', '저키/스틱', '스낵', '통살/소시지', '덴탈간식', '파우더', '우유/분유/음료', '영양제', '기타']
    },
    {
        category: '장난감',
        detailCategory: ['낚시대', '레이져', '공/인형', '터널', '스크래쳐/박스', '기타']
    },
    {
        category: '의류',
        detailCategory: ['옷', '악세사리', '하네스', '넥카라', '기타']
    },
    {
        category: '위생',
        detailCategory: ['칫솔/치약', '미용', '목욕', '화장실', '모래', '기타']
    },
    {
        category: '용품',
        detailCategory: ['급식기/급수기', '정수기/자동급식기', '캣타워', '캣휠', '사료통', '울타리', '기타']
    }
]