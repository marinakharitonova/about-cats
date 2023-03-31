import {NextApiRequest, NextApiResponse} from "next";
import {instance, requestHelper} from "@/pages/api/axiosInstance";

interface IRemoveFavResponse {
    message: string
}

/**
 * Remove the image from favorites
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<IRemoveFavResponse | string>) {
    const { favouriteId } = req.query
    const promise = instance.delete(`favourites/${favouriteId}`)
    requestHelper(req, res, promise)
}