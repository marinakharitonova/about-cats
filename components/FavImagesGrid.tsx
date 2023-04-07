import React, {memo, useContext, useEffect} from 'react';
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import useSWR from "swr";
import {imagesFetcher} from "@/lib/fetchers/fetchers";
import {FAV_IMAGES_LIMIT} from "@/pages/favorites";
import ImagesGrid from "@/components/ImagesGrid";
import {IFavorites} from "@/types/IFavorites";
import {canLoadMore} from "@/lib/canLoadMore";
import {Box, Grid, Skeleton, useConst} from "@chakra-ui/react";
import {filterParams} from "@/lib/filterParams";
import {useLocalStorage} from "@/lib/hooks/useLocalStorage";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useFavorites} from "@/lib/hooks/useFavorites";

type FavImagesGridProps = {
    page: number
    successCb: (canLoadMore: boolean) => void
}

/**
 * FavImagesGrid component renders an images grid for Favorites page.
 */
function FavImagesGrid({page, successCb}: FavImagesGridProps) {
    const userId = useContext(UserIdContext)
    const params: IImagesRequestParams = {order: 'DESC', page, limit: FAV_IMAGES_LIMIT, sub_id: userId}

    const {favorites, isFavoritesLoading} = useFavorites(params, {
        onSuccess: data => successCb(canLoadMore(FAV_IMAGES_LIMIT, page, data.imagesCount))
    })

    console.log(favorites);

    const skeletonElems = []
    for (let i = 0; i < 10; i++) {
        skeletonElems.push(<Skeleton key={i} height='170px'/>)
    }


    return (
        <>
            {isFavoritesLoading &&
                <Grid templateColumns='repeat(5, 1fr)' gap={6} w='100%' alignContent={'flex-start'} minH={'752px'}>
                    {skeletonElems}
                </Grid>}
            <ImagesGrid data={favorites} alertText={`No Favorites yet, just click on one of the images in Vote or Search to 'Fav-it'`}/>
        </>
    )
}

export default memo(FavImagesGrid);