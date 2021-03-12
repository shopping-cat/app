const numberFormat = (str: string) => {
    return str.replace(/[^0-9]/g, '')
}

export default numberFormat