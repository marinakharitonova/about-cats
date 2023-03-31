import {NextApiRequest, NextApiResponse} from "next";
import {instance, requestHelper} from "@/lib/axiosInstance";

interface IVoteResponse {
    country_code: string
    id: number
    image_id: string
    message: string
    value: number
}

/**
 * Voting on Images (Up or Down)
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<IVoteResponse | string>) {
    const promise = instance.post('votes', req.body)
    requestHelper(req, res, promise)
}