import type {NextApiRequest, NextApiResponse} from 'next'
import {IImage} from "@/types/Iimage";
import {instance, requestHelper} from "@/pages/api/axiosInstance";


/**
 * Get a random cat image
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<IImage[] | string>) {

    try {
        const result = await instance.get('images/search', {params: req.query})
        res.status(200).json(result.data)
    } catch (err) {
        res.status(500).json('failed to load data')
    }


    //requestHelper(req, res, promise)
}
