import {NextApiRequest, NextApiResponse} from "next";
import {instance} from "@/lib/axiosInstance";
import requestHandler from "@/lib/requestHandler";

interface IAddFavResponse {
    message: string
    id: number
}

/**
 * Add the image to favorites
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<string | IAddFavResponse>) {
    await requestHandler(req, res, instance.post<IAddFavResponse>('favourites', req.body))
}