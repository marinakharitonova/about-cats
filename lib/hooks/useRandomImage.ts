import useSWRImmutable from "swr/immutable";
import {IImages} from "@/types/IImages";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {SWRConfiguration} from "swr";
import {filterParams} from "@/lib/filterParams";
import {imagesFetcher} from "@/lib/fetchers/imagesFetcher";

export const useRandomImage = (params?: IImagesRequestParams, config?: SWRConfiguration,) => {
    const {
        data,
        isLoading,
        isValidating,
        mutate,
    } = useSWRImmutable<IImages>(['/api/images', filterParams(params ?? {})], imagesFetcher, config)

    return {
        image: data?.images[0],
        isImageLoading: isLoading,
        mutateImage: mutate,
        isImageValidating: isValidating
    }
}