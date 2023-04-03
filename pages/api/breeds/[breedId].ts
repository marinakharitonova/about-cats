import {NextApiRequest, NextApiResponse} from "next";
import {instance, requestHelper} from "@/pages/api/axiosInstance";
import {IBreed} from "@/types/IBreed";

export default function handler(req: NextApiRequest, res: NextApiResponse<IBreed | string>) {
    const { breedId } = req.query
    const promise = instance.get(`breeds/${breedId}`)
    requestHelper(req, res, promise)
}