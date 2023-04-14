import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import useSWR, {SWRConfiguration} from "swr";
import {filterParams} from "@/lib/filterParams";
import {IUploads} from "@/types/IUploads";
import {imagesFetcher} from "@/lib/fetchers/imagesFetcher";

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