import { useCallback, useState } from "react"
import asyncDelay from "../lib/asyncDelay"

const useRefreshing = (refetch: () => Promise<any>) => {

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(async () => {
        if (refreshing) return
        setRefreshing(true)
        await refetch()
        setRefreshing(false)
    }, [refreshing])

    return {
        refreshing,
        onRefresh
    }
}

export default useRefreshing