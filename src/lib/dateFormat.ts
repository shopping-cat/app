import dayjs from "dayjs"

const dateFormat = (date: string): string => {
    return dayjs(date).format('YYYY.MM.DD')
}

export default dateFormat