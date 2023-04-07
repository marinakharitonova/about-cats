import {AxiosResponse} from "axios";
import {IImages} from "@/types/IImages";

/**
 * collectImagesData function adds to the image data the number of images taken from the response headers.
 */
export const collectImagesData = (response: AxiosResponse): IImages => {
    return {
        images: response.data,
        imagesCount: response.headers['pagination-count'] ? response.headers['pagination-count'] : null
    }
}