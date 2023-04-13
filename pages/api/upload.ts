import {NextApiRequest, NextApiResponse} from "next";
import requestHandler from "@/lib/requestHandler";
import {instance} from "@/lib/axiosInstance";

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {headers: lastHeaders} = req;

    const headers = {
        'content-type': lastHeaders['content-type'],
        'content-length': lastHeaders['content-length']
    }

    await requestHandler(req, res, await instance.post<FormData>('images/upload', req, {
        headers: headers
    }))
}