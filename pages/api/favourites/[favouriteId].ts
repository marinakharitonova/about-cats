import {NextApiRequest, NextApiResponse} from "next";
import {instance} from "@/lib/axiosInstance";
import requestHandler from "@/lib/requestHandler";

interface IRemoveFavResponse {
    message: string
}

/**
 * Remove the image from favorites
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<IRemoveFavResponse | string>) {
    const { favouriteId } = req.query

    await requestHandler(req, res, instance.delete(`favourites/${favouriteId}`))
}