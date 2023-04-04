import {instance} from "@/lib/axiosInstance";
import {IBreed} from "@/types/IBreed";
import {AxiosResponse} from "axios";

export const fetchBreedById = async (breedId: string): Promise<AxiosResponse<IBreed, any>> => {
    return await instance.get<IBreed>(`breeds/${breedId}`)
}