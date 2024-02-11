import { stringify } from 'qs';
import _ from 'lodash'

import { isPlainObject } from './type';

/**
 * 将对象转化为a=b&c=d这种形式的字符串，第二个参数控制是否对key/value做encodeURIComponent操作，默认是做
 * @param {Object} searchParams 传入的querystring对象或者form的body 对象
 * @param {boolean} disableEncode 是否禁用默认的encodeURIComponent行为
 */
export function objectToQs(searchParams: any, disableEncode?: any, options?: any) {
  if (_.isEmpty(searchParams)) return ''
  return stringify(searchParams, {
    encode: !disableEncode,
    arrayFormat: 'indices',
    encodeValuesOnly: true,
    ...options,
  });
}

/**
 * 格式化 body 为form类型
 * */
export function formSerializer(body: any) {
  if (isPlainObject(body)) {
    return objectToQs(body);
  }

  return body;
}

// 针对多级对象，需要将key取出并重新放置进去，否则后端无法反射
function convertObjectAndArray(prefixKey: string, value: any, convertedData: any) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      const newPrefixKey = `${prefixKey}[${index}]`;
      convertObjectAndArray(newPrefixKey, item, convertedData);
    });
  } else if (typeof value === 'object' && value !== null) {
    // value为null会报错
    Object.keys(value).forEach((key) => {
      const v = value[key];
      const requestKey = `${prefixKey}.${key}`;
      convertObjectAndArray(requestKey, v, convertedData);
    });
  } else {
    convertedData[prefixKey] = value;
  }
}

/**
 *
 * */
export function kindaStringify(params: any = {}) {
  const result = {};
  Object.keys(params).forEach((key) => {
    const value = params[key];
    convertObjectAndArray(key, value, result);
  });

  return result;
}

/**
 * promise 结果转数组
 */
export function to(promise: Promise<any>): Promise<any[]> {
  return new Promise((resolve) => {
    promise.then(
      (res) => resolve([res, null]),
      (err) => resolve([null, err]),
    );
  });
}
