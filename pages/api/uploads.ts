import {NextApiRequest, NextApiResponse} from "next";
import requestHandler from "@/lib/requestHandler";
import {instance} from "@/lib/axiosInstance";
import {IUploads} from "@/types/IUploads";

/**
 * Get a list of uploaded cat images with passed parameters.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<IUploads | string>) {
    await requestHandler(req, res, instance.get<IUploads>('images', {params: req.query}), true)
}