import {instance} from "@/lib/axiosInstance";
import {IBreed} from "@/types/IBreed";

/**
 * Fetch data on all available breeds.
 */
export const fetchBreeds = async (): Promise<IBreed[]> => {
    const response = await instance.get<IBreed[]>('breeds')

    return response.data
}