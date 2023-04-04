import {instance} from "@/lib/axiosInstance";
import {IImage} from "@/types/Iimage";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {AxiosResponse} from "axios";

const IMAGES_ORDER: IImagesRequestParams["order"] = "ASC"

export const fetchImages = async (params?: IImagesRequestParams): Promise<AxiosResponse<IImage[], any>> => {

    return await instance.get<IImage[]>('images/search', {
        params: {
            order: IMAGES_ORDER,
            ...params,
        }
    })
}