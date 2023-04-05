import {instance} from "@/lib/axiosInstance";
import {IImage} from "@/types/Iimage";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {AxiosResponse} from "axios";
import {filterParams} from "@/lib/filterParams";

export const fetchImages = async (params: IImagesRequestParams): Promise<AxiosResponse<IImage[], any>> => {

    return await instance.get<IImage[]>('images/search', {
        params: {
            ...filterParams(params),
        }
    })
}