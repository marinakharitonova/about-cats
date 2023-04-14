import {NextApiRequest, NextApiResponse} from "next";
import requestHandler from "@/lib/requestHandler";
import {instance} from "@/lib/axiosInstance";

/**
 * Remove the image from uploads
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    const {imageId} = req.query

    await requestHandler(req, res, instance.delete<string>(`images/${imageId}`))
}