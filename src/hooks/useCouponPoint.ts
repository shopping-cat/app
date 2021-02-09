import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback } from "react"
import { OrderCalculateCouponVar } from '../graphql/order'

const pointVar = makeVar<number>(0)
const couponsVar = makeVar<OrderCalculateCouponVar[]>([])

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

    const setCoupons = useCallback((v: OrderCalculateCouponVar[]) => {
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