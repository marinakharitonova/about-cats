import type {NextApiRequest, NextApiResponse} from 'next'
import {IImage} from "@/types/Iimage";
import {instance, requestHelper} from "@/lib/axiosInstance";


/**
 * Get a random cat image
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<IImage[] | string>) {
    const promise = instance.get('images/search')
    requestHelper(req, res, promise)
}
