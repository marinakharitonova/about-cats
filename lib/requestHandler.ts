import {NextApiRequest, NextApiResponse} from "next";
import axios from "axios";

/**
 * A helper function for executing api requests and catching errors
 */
export default async function requestHandler(req: NextApiRequest, res: NextApiResponse, promise: any) {
    try {
        const result = await promise
        res.status(200).json(result.data)
    } catch (error) {
        if (axios.isAxiosError(error)) {
            res.status(error.status ?? 500).json(JSON.stringify(error?.response?.data ?? 'Internal server error'))
        }
    }
}