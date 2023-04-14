import {instance} from "@/lib/axiosInstance";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {AxiosResponse} from "axios";
import {filterParams} from "@/lib/filterParams";
import {IImage} from "@/types/IImage";

/**
 * Fetch a list of images with given parameters.
 */
export const fetchImages = async (params: IImagesRequestParams): Promise<AxiosResponse<IImage[], any>> => {

    return await instance.get<IImage[]>('images/search', {
        params: {
            ...filterParams(params),
        }
    })
}