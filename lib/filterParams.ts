import {IImagesRequestParams} from "@/types/IImagesRequestParams";

type Keys = keyof IImagesRequestParams

/**
 * filterParams function returns a new parameter object with no values equal to the empty string.
 */
export const filterParams = (params: IImagesRequestParams) => {

    let filteredParams = {} as IImagesRequestParams
    for (let key in params) {
        const value = params[key as Keys]
        if (value !== '') {
            (filteredParams as any)[key as Keys] = value
        }
    }

    return filteredParams
}
