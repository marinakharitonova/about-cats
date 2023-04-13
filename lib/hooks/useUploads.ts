import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import useSWR, {SWRConfiguration} from "swr";
import {filterParams} from "@/lib/filterParams";
import {imagesFetcher} from "@/lib/fetchers/fetchers";
import {IUploads} from "@/types/IUploads";

export const useUploads = (params?: IImagesRequestParams, config?: SWRConfiguration) => {
    const {
        data,
        isLoading,
        isValidating,
    } = useSWR<IUploads>(['/api/uploads', filterParams(params ?? {})], imagesFetcher, config)

    return {
        images: data?.images,
        imagesCount: data?.imagesCount,
        isLoading,
        isValidating
    }
}