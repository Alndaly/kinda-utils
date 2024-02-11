import type { ParsedQs } from 'qs';
import { parse } from 'qs';

/**
 * 将包含html entity内容，转换为对应的内容
 * @param {string} htmlWithEntity 带有html实体的内容，比如&amp;
 */
export function decodeHTML(htmlWithEntity: string): string {
  // 如果是falsy value，返回''
  if (!htmlWithEntity) return '';
  // 如果不是字符串，抛出异常
  if (typeof htmlWithEntity !== 'string') throw new TypeError('提供的内容不是字符串');

  const textArea = document.createElement('textarea');
  textArea.innerHTML = htmlWithEntity;

  return textArea.value;
}

/**
 * 根据传入key获取某个query的值，假如key不传入，那么返回整个querystring对象
 * @param {String?} key qs的key，可以不传入
 */
export function getQueryString(
  key?: string,
): string | ParsedQs | string[] | ParsedQs[] | undefined {
  const qs = window.location.search.slice(1);
  const result = parse(qs);
  return key ? result[key] : result;
}

/**
 * 对url添加新的querystring
 * @param {String} baseUrl 基础的url
 * @param {Object} query 传入的qs对象
 * @param {Boolean} ignoreUndefined 是否忽略undefined的值
 */
export function mergeQueryString(
  baseUrl: string,
  query: Record<string, string>,
  ignoreUndefined = true,
) {
  const url = new URL(baseUrl);
  for (const [key, value] of Object.entries(query)) {
    if (ignoreUndefined) {
      if (typeof value !== 'undefined') {
        url.searchParams.set(key, value);
      }
    } else {
      url.searchParams.set(key, value);
    }
  }
  return url.toString();
}

/**
 * 根据传入key获取某个query的值，假如key不传入，那么返回整个querystring对象
 * @param {String?} key qs的key，可以不传入
 */
export function parseQueryString(search: string): ParsedQs {
  let qs = search;
  if (!qs || typeof qs !== 'string') return {};

  if (qs[0] === '?') {
    qs = qs.slice(1);
  }
  return parse(qs);
}

/**
 * 获取某个cookie的值，如果不存在，返回undefined
 * @param {String} cookieName cookie的名字
 */
export function getCookie(cookieName: string): string | undefined {
  const name = `${cookieName}=`;
  const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]!.trim();
      if (cookie.indexOf(name) === 0) {
        return cookie.substring(name.length, cookie.length);
      }
    }

  return undefined;
}

/**
 * query 参数地址拼接
 * */
export function joinUrl(url: string, qs: string): string {
  if (!qs) return url;
  if (url.indexOf('?') >= 0) {
    return `${url}&${qs}`;
  }
  return `${url}?${qs}`;
}

/**
 * 是否为移动终端
 */
export const checkMobile = (): boolean => {
  const u = navigator.userAgent;
  return !!u.match(/AppleWebKit.*Mobile.*/);
};
