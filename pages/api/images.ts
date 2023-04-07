import type {NextApiRequest, NextApiResponse} from 'next'
import {fetchImages} from "@/lib/fetchImges";
import {IImages} from "@/types/IImages";
import requestHandler from "@/lib/requestHandler";

/**
 * Get a list of cat images with passed parameters.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<IImages | string>) {
    await requestHandler(req, res, fetchImages(req.query), true)
}
