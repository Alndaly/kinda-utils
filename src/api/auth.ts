import { post } from "@/utils/request";


interface TokenGetApiBody {
    grant_type: string;
    username: string;
    password: string;
}
interface ClientInfo {
    client_id: string;
    client_secret: string;
}

/**
 * 
 * @param url 获取token的接口链接
 * @param body 含有用户信息的传参
 * @param clientInfo 含有客户端信息的传参
 * @returns 
 */
export const getToken = async (url: string, body: TokenGetApiBody, clientInfo: ClientInfo) => {
    const {
        client_id,
        client_secret
    } = clientInfo;
    return post(
        url,
        body,
        {
            headers: {
                'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret)
            }
        }
    );
};

