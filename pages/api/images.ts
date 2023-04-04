import type {NextApiRequest, NextApiResponse} from 'next'
import {IImage} from "@/types/Iimage";
import {fetchImages} from "@/lib/fetchImges";
import requestHandler from "@/lib/requestHandler";

/**
 * Get a list of cat images with passed parameters.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<IImage[] | string>) {
    await requestHandler(req, res, fetchImages(req.query))
}
