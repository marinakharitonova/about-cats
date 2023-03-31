import {NextApiRequest, NextApiResponse} from "next";
import {instance, requestHelper} from "@/pages/api/axiosInstance";
import axios from "axios";

interface IAddFavResponse {
    message: string
    id: number
}

/**
 * Add the image to favorites
 */
export default function handler(req: NextApiRequest, res: NextApiResponse<string | IAddFavResponse>) {
    axios.post('https://api.thecatapi.com/v1/favourites', req.body, {
        headers: {
            'x-api-key': 'live_mhwJgjzKxFzVNq1GK5ZMbgsU3AorN9RAOteFwLOb3jo9aNaMw9EgulsSQQpYxlCs'
        }
    }).then(r => res.status(200).json(r.data))


    // const promise = instance.post<IAddFavResponse>('favourites', req.body)
    // requestHelper(req, res, promise)
}