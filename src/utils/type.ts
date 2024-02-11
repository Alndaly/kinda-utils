/**
 * 检测对象是不是对象类型
 * @param {*} obj 检测的对象
 */
export function isObject(obj: any): boolean {
    return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * 判断是否是一个简单对象，包含Object Literal以及通过Object.create(null)产生的对象
 * @param {*} obj 任何类型对象
 */
export function isPlainObject(obj: any): boolean {
    return !!(
        obj &&
        typeof obj === 'object' &&
        (obj.constructor === Object || obj.constructor === undefined)
    );
}

/**
 * 检测对象是不是函数
 * @param {*} fun 检测的对象
 */
export function isFunction(fun: any): boolean {
    return Object.prototype.toString.call(fun) === '[object Function]';
}

/**
 * 检测对象是不是数组
 * @param {*} obj 检测的对象
 */
export function isArray(arr: any): boolean {
    return Array.isArray(arr);
}

/**
 * 判断是否定义和存在值
 */
export function isNullOrUndefined(value: any): boolean {
    return value === null || value === undefined;
}
