import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

/**
 * A helper function for executing api requests and catching errors
 */
export default async function requestHandler(req: NextApiRequest, res: NextApiResponse, promise: any, collectImagesData?: boolean) {
    try {
        const result = await promise
        if (collectImagesData) {
            const imagesCount = result.headers['pagination-count'] ? Number(result.headers['pagination-count']) : null
            res.status(200).json({images: result.data, imagesCount})
        } else {
            res.status(200).json(result.data)
        }

    } catch (error) {
        if (axios.isAxiosError(error)) {
            res.status(error?.response?.status ?? 500).json(JSON.stringify(error?.response?.data ?? 'Internal server error'))
        } else {
            res.status(500).json('Internal server error')
        }
    }
}