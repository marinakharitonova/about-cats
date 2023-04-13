import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import useSWR, {SWRConfiguration} from "swr";
import {filterParams} from "@/lib/filterParams";
import {imagesFetcher} from "@/lib/fetchers/fetchers";
import {IFavorites} from "@/types/IFavorites";

export const useFavorites = (params?: IImagesRequestParams, config?: SWRConfiguration, isFavoritesPage ?: boolean) => {
    const {
        data,
        isLoading,
        isValidating,
    } = useSWR<IFavorites>(isFavoritesPage ? null : ['/api/favourites', filterParams(params ?? {})], imagesFetcher, config)

    return {
        favorites: data?.images,
        favoritesCount: data?.imagesCount,
        isFavoritesLoading: isLoading,
        isFavoritesValidating: isValidating
    }
}