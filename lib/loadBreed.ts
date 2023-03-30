import {instance} from "@/pages/api/_instance";
import {IBreed} from "@/types/IBreed";
import {IImage} from "@/types/Iimage";

export const loadBreed = async () => {
    const response = await instance.get<IBreed>('breeds/abys')

    return response.data
}

export const loadBreedImages = async () => {
    const response = await instance.get<IImage[]>('images/search', {
        params: {
            breed_ids: 'abys',
            limit: 5
        }
    })

    return response.data
}