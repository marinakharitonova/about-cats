import {IBreed} from "@/types/IBreed";
import {IImage} from "@/types/Iimage";
import {instance} from "@/pages/api/axiosInstance";

export const DEFAULT_BREED_ID = 'abys'
export const BREEDS_IMAGES_COUNT = 5

/**
 * Functions that fetch data for pre-rendering of the Breeds page
 */
export const fetchBreed = async () => {
    const response = await instance.get<IBreed>(`breeds/${DEFAULT_BREED_ID}`)

    return response.data
}

export const fetchBreedImages = async () => {
    const response = await instance.get<IImage[]>('images/search', {
        params: {
            breed_ids: DEFAULT_BREED_ID,
            limit: BREEDS_IMAGES_COUNT
        }
    })

    return response.data
}

export const fetchBreeds = async () => {
    const response = await instance.get<IBreed[]>('breeds')

    return response.data
}