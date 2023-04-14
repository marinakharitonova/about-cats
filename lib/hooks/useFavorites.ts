import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import useSWR, {SWRConfiguration} from "swr";
import {filterParams} from "@/lib/filterParams";
import {IFavorites} from "@/types/IFavorites";
import {imagesFetcher} from "@/lib/fetchers/imagesFetcher";

export const useFavorites = (params?: IImagesRequestParams, config?: SWRConfiguration, shouldFetch ?: boolean) => {
    const {
        data,
        isLoading,
        isValidating,
    } = useSWR<IFavorites>(shouldFetch ? ['/api/favourites', filterParams(params ?? {})]: null, imagesFetcher, config)

    return {
        favorites: data?.images,
        favoritesCount: data?.imagesCount,
        isFavoritesLoading: isLoading,
        isFavoritesValidating: isValidating
    }
}