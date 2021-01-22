export type ID = number // autoIncreasement
export type OrderState =
    '구매접수' | // 파란색
    '취소처리' | // 취소 // 빨간색
    '배송중' | '배송완료' | '구매확정' | // 정상 // 파란색
    '환불중' | '환불처리' | // 환불 // 빨간색
    '교환중' | '교환처리' // 교환 // 빨간색