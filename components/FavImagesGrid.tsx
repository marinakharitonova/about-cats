import React, {memo, useContext} from 'react';
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {FAV_IMAGES_LIMIT} from "@/pages/favorites";
import ImagesGrid from "@/components/ImagesGrid";
import {canLoadMore} from "@/lib/canLoadMore";
import {Grid, Skeleton} from "@chakra-ui/react";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useFavorites} from "@/lib/hooks/useFavorites";
import DeletingImage from "@/components/DeletingImage";
import FavoringImage from "@/components/FavoringImage";

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

    const skeletonElems = []
    for (let i = 0; i < 10; i++) {
        skeletonElems.push(<Skeleton key={i} height='170px'/>)
    }

    return (
        // <>
        //     {isFavoritesLoading &&
        //         <Grid templateColumns='repeat(5, 1fr)' gap={6} w='100%' alignContent={'flex-start'} minH={'752px'}>
        //             {skeletonElems}
        //         </Grid>}
        //     <ImagesGrid images={favorites} alertText={`No Favorites yet, just click on one of the images in Vote or Images to 'Fav-it'`}/>
        // </>


        <ImagesGrid images={favorites}
                    alertText={`No Favorites yet, just click on one of the images in Vote or Images to 'Fav-it'`}
                    isLoading={isFavoritesLoading}>
            {
                (children, imageId, removingId, src) =>
                    <FavoringImage key={imageId} imageId={imageId} removingId={removingId} size={50} src={src!}>
                        {children}
                    </FavoringImage>
            }
        </ImagesGrid>
    )
}

export default memo(FavImagesGrid);