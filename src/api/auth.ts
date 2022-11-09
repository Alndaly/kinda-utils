import { post } from "../utils/request";

export const getToken = async (url: string, body: any = {}, clientInfo: any) => {
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

