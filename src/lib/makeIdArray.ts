const makeIdArray = (length = 6) => {
    return Array(length).fill(0).map(() => ({ id: Math.floor(Math.random() * 100000) }))
}

export default makeIdArray