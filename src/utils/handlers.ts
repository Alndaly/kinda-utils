// 只列出 http 1.0/1.1的常用的、且能被fetch返回的status code
// 重定向相关的statusCode无法获取
export const statusCodeMsg = {
    301: '资源被永久转移',
    302: '资源被临时转移',
    400: '发起的请求有错误',
    401: '请登录后访问',
    403: '没有权限访问',
    404: '资源不存在',
    406: '请求的格式不可得',
    410: '请求的资源已经被永久删除',
    422: '当创建一个对象时，发生一个验证错误',
    500: '服务器出错啦',
    502: '网关错误',
    503: '服务不可用，服务器暂时过载或维护',
    504: '网关超时',
  };
  
  /**
   *  按照返回编码类型解码数据，默认utf-8
   * */
  export function readResAsString(response: Response) {
    let charset = 'utf-8';
    const contentType = response.headers.get('Content-Type');
    if (contentType) {
      const parts = contentType.split(';');
      if (parts.length === 2) {
        const [, value] = parts[1]!.split('=');
        const encoding = value && value.trim();
        if (encoding) {
          charset = encoding;
        }
      }
    }
  
    return response.blob().then(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new window.FileReader();
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
          reader.readAsText(file, charset);
        }),
    );
  }
  
  // 解析成json
  export function toJson(response: Response) {
    return readResAsString(response).then((str: any) => JSON.parse(str));
  }
  