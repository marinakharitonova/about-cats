import {NextApiRequest, NextApiResponse} from "next";
import {instance, requestHelper} from "@/pages/api/_instance";

interface IAddRavResponse {
    message: string
    id: number
}

/**
 * Add the image to favorites
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<string | IAddRavResponse>) {
    const promise = instance.post('favourites', req.body)
    requestHelper(req, res, promise)
}