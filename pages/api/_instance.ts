import axios from "axios";
import {NextApiRequest, NextApiResponse} from "next";

/**
 * Axios instance to make requests to Cat API https://developers.thecatapi.com/
 */
export const instance = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
})

instance.defaults.headers.common['x-api-key'] = process.env.API_KEY


/**
 * A helper function for catching errors in api requests
 */
export const requestHelper = (req: NextApiRequest, res: NextApiResponse, promise) => {
    promise
        .then(r => res.status(200).json(r.data))
        .catch(err => res.status(err.response.status).json(JSON.stringify(err.response.data)))
}