import { post } from "../utils/request";

export const getToken = async (url: string, body: any = {}, client_id: string, client_secret: string) => {
    return post(
        url,
        body,
        {
            headers: {
                'Authorization': 'Basic ' + btoa(client_id + ":" + client_secret)
            }
        }
    )
}

