import {NextApiRequest, NextApiResponse} from "next";
import {IBreed} from "@/types/IBreed";
import {fetchBreedById} from "@/lib/fetchBreedById";
import requestHandler from "@/lib/requestHandler";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IBreed | string>) {
    const {breedId} = req.query

    await requestHandler(req, res, fetchBreedById(breedId!.toString()))
}