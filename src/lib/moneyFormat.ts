// 1000000 -> 1,000,000
const moneyFormat = (money: number): string => {
    try {
        let str = ''
        for (const [i, v] of money.toString().split('').reverse().entries()) {
            if (i > 0 && i % 3 === 0) str += ','
            str += v
        }
        return str.split('').reverse().join('')
    } catch (error) {
        console.log(error)
        return money.toString()
    }
}

export default moneyFormat