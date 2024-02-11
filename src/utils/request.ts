import {
    objectToQs,
    kindaStringify
} from './common';
import { joinUrl } from './browser';
import { formSerializer } from './common';
import { isPlainObject } from './type';

export type Params = Record<string, any>;

const defaultOptions = {
    mode: 'cors' as RequestMode,
    // credentials: 'include' as RequestCredentials,
};

// 获取请求url
export const getUrl = (url: string, method: string, params: Params): string => {
    const TIMESTAMP = '_ksTS';
    let searchParams: any = {};
    if (method === 'GET') {
        searchParams[TIMESTAMP] = new Date().valueOf();
        if (isPlainObject(params)) searchParams = { ...searchParams, ...params };
    }
    return joinUrl(url, objectToQs(searchParams, false, { encodeValuesOnly: false }));
};

/**
 * 请求主体
 * @param {string} url
 * @param {Params} params
 * @param {RequestOption} options
 * */
export const request = async (url: string, params: Params = {}, options: RequestInit = {}) => {
    const { method = 'GET' } = options;
    const realUrl: string = getUrl(url, method, params);
    const realOptions: RequestInit = { ...defaultOptions, ...options };

    const response = await fetch(realUrl, realOptions)
    if (response.status >= 200 && response.status < 300) {
        const result = await response.json();
        return result;
    }
    // @ts-ignore
    const error = new Error(statusCodeMsg[response.status] || response.statusText);
    // @ts-ignore
    error.__response = response;
    throw (error);
};

/**
 * 标准get请求
 * @param {string} url
 * @param {Param} params
 * @param {RequestOption} options
 * */
export function get(url: string, params?: Params, options?: RequestInit) {
    return request(url, params, { method: 'GET', ...options });
}

/**
 * 标准post请求
 * @param {string} url
 * @param {Params} params
 * @param {RequestOption} options
 * */
export function post(url: string, params?: Params, options?: RequestInit) {
    const { headers, body } = options || {};
    return request(
        url,
        {},
        {
            ...options,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
                ...headers,
            },
            body: body || formSerializer(kindaStringify(params || {})),
        },
    );
}