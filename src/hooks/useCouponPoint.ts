import { makeVar, useReactiveVar } from "@apollo/client"
import { useCallback } from "react"

const pointVar = makeVar<number>(0)
const couponIdsVar = makeVar<null | (string | null)[]>(null)

const useCouponPoint = () => {

    const point = useReactiveVar(pointVar)
    const couponIds = useReactiveVar(couponIdsVar)

    const init = useCallback(() => {
        couponIdsVar(null)
        pointVar(0)
    }, [])

    const setPoint = useCallback((v: number) => {
        pointVar(v)
    }, [])

    const setCouponIds = useCallback((v: null | (string | null)[]) => {
        couponIdsVar(v)
    }, [])

    return {
        init,
        point,
        couponIds,
        setPoint,
        setCouponIds
    }
}

export default useCouponPoint