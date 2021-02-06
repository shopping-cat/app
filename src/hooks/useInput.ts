import { useState, useCallback } from 'react';

const useInput = (initialValue = '', onlyInt = false): any => {

    const [value, setValue] = useState(initialValue)

    const onChange = useCallback((t: string) => {
        if (onlyInt) {
            if (Number.isInteger(Number(t))) setValue(t)
        } else setValue(t)

    }, [onlyInt])

    const onClear = useCallback(() => {
        setValue('')
    }, [])

    return [value, onChange, setValue, onClear]
}

export default useInput