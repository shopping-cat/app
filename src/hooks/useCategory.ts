import { useCallback, useState } from "react"
import { Category } from "../constants/types"

const useCategory = (c1?: Category, c2?: Category) => {

    const [category1, setCategory1] = useState<Category>(c1 || null)
    const [category2, setCategory2] = useState<Category>(c2 || null)

    const onChangeCategory = useCallback((c1, c2) => {
        setCategory1(c1)
        setCategory2(c2)
    }, [])

    return {
        category1,
        category2,
        onChangeCategory
    }
}

export default useCategory