import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import useSWR, {SWRConfiguration} from "swr";
import {IImages} from "@/types/IImages";
import {filterParams} from "@/lib/filterParams";
import {imagesFetcher} from "@/lib/fetchers/fetchers";

export const useImages = (params?: IImagesRequestParams, config?: SWRConfiguration,) => {
    const {
        data,
        isLoading,
        isValidating,
    } = useSWR<IImages>(['/api/images', filterParams(params ?? {})], imagesFetcher, config)

    return {
        images: data?.images,
        imagesCount: data?.imagesCount,
        isLoading,
        isValidating
    }
}