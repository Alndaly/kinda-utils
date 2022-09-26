export default {

    // 此处expire是分钟数
    set(key: string, val: any, expire: number) {
        try {
            let data
            let dataObj: any
            let curTime = data ? dataObj.saveTime : new Date().getTime()
            expire = expire ? (data ? dataObj.expire : (1000 * expire)) : null
            localStorage.setItem(key, JSON.stringify({
                data: val,
                saveTime: curTime,
                expire
            }))
        } catch (e) {
            console.log(e)
        }
    },

    // 判断是否过期
    expired(key: string) {
        try {
            const data = localStorage.getItem(key)
            if (data) {
                const dataObj = JSON.parse(data)
                if (dataObj.expire && new Date().getTime() - dataObj.saveTime > dataObj.expire) {
                    return true
                } else {
                    return false
                }
            }
        } catch (e) {
            console.error(e)
            return false
        }
        return false
    },

    // 直接获取，不做时间判断处理
    directGet(key: string) {
        try {
            const data = localStorage.getItem(key)
            if (data) {
                const dataObj = JSON.parse(data)
                return dataObj
            }
            return null
        } catch (e) {
            console.error(e)
        }
    },

    get(key: string) {
        try {
            const data = localStorage.getItem(key)
            if (data) {
                const dataObj = JSON.parse(data)
                if (dataObj.expire && new Date().getTime() - dataObj.saveTime > dataObj.expire) {
                    return null
                    // this.remove(key)
                } else {
                    return dataObj.data
                }
            }
            return null
        } catch (e) {
            console.error(e)
        }
    },

    remove(key: string) {
        try {
            localStorage.removeItem(key)
        } catch (e) {
            // error
        }
    },

    clear() {
        try {
            localStorage.clear()
        } catch (e) {
            // error
        }
    }

}