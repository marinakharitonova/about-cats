import {NextApiRequest, NextApiResponse} from "next";
import {instance, requestHelper} from "@/lib/axiosInstance";

interface IAddFavResponse {
    message: string
    id: number
}

/**
 * Add the image to favorites
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<string | IAddFavResponse>) {
    const promise = instance.post<IAddFavResponse>('favourites', req.body)
    requestHelper(req, res, promise)
}