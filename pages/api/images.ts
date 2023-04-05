import type {NextApiRequest, NextApiResponse} from 'next'
import {fetchImages} from "@/lib/fetchImges";
import axios from "axios";
import {IImages} from "@/types/IImages";

/**
 * Get a list of cat images with passed parameters.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<IImages | string>) {
    try {
        const result = await fetchImages(req.query)

        const imagesCount = result.headers['pagination-count'] ? result.headers['pagination-count'] : null

        res.status(200).json({images: result.data, imagesCount})

    } catch (error) {
        if (axios.isAxiosError(error)) {
            res.status(error?.response?.status ?? 500).json(JSON.stringify(error?.response?.data ?? 'Internal server error'))
        }
    }
}
