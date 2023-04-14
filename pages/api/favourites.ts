import {NextApiRequest, NextApiResponse} from "next";
import {instance} from "@/lib/axiosInstance";
import requestHandler from "@/lib/requestHandler";
import {IFavorites} from "@/types/IFavorites";
import {IAddFavResponse} from "@/types/IAddFavResponse";

/**
 * POST: Add the image to favorites
 * GET: Get a list of favorites images with number of images
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<string | IAddFavResponse| IFavorites>) {
    if (req.method === 'POST') {
        await requestHandler(req, res, instance.post<IAddFavResponse>('favourites', req.body))
    } else if (req.method === 'GET') {
        await requestHandler(req, res, instance.get<IFavorites>('favourites', {params: req.query}), true)
    }
}