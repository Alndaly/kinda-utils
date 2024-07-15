import dayjs from "dayjs";

/**
 * 延迟函数
 * @param time 延迟时间
 * @returns Promise
 */
export const sleep = (time: number) => {
    return new Promise((resolve) => setTimeout(resolve, time));
}
/**
 * 获取当前时间
 * @returns string
 */
export const getCurrentTime = () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss')
}
/**
 * 
 * @param delay 间隔时间
 * @param type 'day'|'month'|'year'
 * @returns 
 */
export const getDelayTime = (delay: number, type: any) => {
    return dayjs()
        .subtract(delay, type)
        .format('YYYY-MM-DD HH:mm:ss')
}
