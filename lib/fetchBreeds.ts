import {instance} from "@/lib/axiosInstance";
import {IBreed} from "@/types/IBreed";

export const fetchBreeds = async (): Promise<IBreed[]> => {
    const response = await instance.get<IBreed[]>('breeds')

    return response.data
}