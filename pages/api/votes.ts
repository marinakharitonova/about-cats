import {NextApiRequest, NextApiResponse} from "next";
import {instance} from "@/lib/axiosInstance";
import requestHandler from "@/lib/requestHandler";

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
export default async function handler(req: NextApiRequest, res: NextApiResponse<IVoteResponse | string>) {
    await requestHandler(req, res, instance.post('votes', req.body))
}