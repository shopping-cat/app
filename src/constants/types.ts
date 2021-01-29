export type ID = number // autoIncreasement
export type PaymentState =
    '구매접수' | // 30 분정도  텀을 둠 // 이때만 유저가 환불 할 수 있음
    '정상처리' | // 정상적으로 주문이 됨
    '취소처리' | // 모든 아이템이 구매접수 상태에서 유저가 전체 취소를 했을때
    '오류처리' // 
export type OrderState = // 각각 아이템에 해당됨
    '구매접수' | // 접수
    '취소처리' | // 유저가 구매접수 단계에서 전체 취소 or 오류로 인한 전체 취소
    '상점취소처리' | // 재고 부족 등의 이유로 상점에서 취소하는 경우
    '배송중' | '배송완료' | '구매확정' | // 정상 
    '환불중' | '환불처리' | // 환불 
    '교환중' | '교환처리' // 교환
export type Category = string | null
export type ItemState = 'sale' | 'stop' | 'noStock'
export type RecommendState = 'none' | 'liked' | 'unliked'