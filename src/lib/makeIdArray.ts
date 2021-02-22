const makeIdArray = (length = 6, isString = false): { id: string | number }[] => {
    return Array(length).fill(0).map(() => {
        let id: number | string = Math.floor(Math.random() * 100000)
        if (isString) id = id.toString()
        return { id }
    })
}

export default makeIdArray