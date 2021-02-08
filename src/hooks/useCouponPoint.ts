import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback } from "react"

const pointVar = makeVar<number>(0)
interface CouponsVar {
    orderItemId: number
    couponId: string
}
const couponsVar = makeVar<CouponsVar[]>([])

const useCouponPoint = () => {

    const point = useReactiveVar(pointVar)
    const coupons = useReactiveVar(couponsVar)

    const init = useCallback(() => {
        couponsVar([])
        pointVar(0)
    }, [])

    const setPoint = useCallback((v: number) => {
        pointVar(v)
    }, [])

    const setCoupons = useCallback((v: CouponsVar[]) => {
        couponsVar(v)
    }, [])

    return {
        init,
        point,
        coupons,
        setPoint,
        setCoupons
    }
}

export default useCouponPoint