import React, {memo, useContext} from 'react';
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {FAV_IMAGES_LIMIT} from "@/pages/favorites";
import ImagesGrid from "@/components/ImagesGrid";
import {canLoadMore} from "@/lib/canLoadMore";
import {Skeleton} from "@chakra-ui/react";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useFavorites} from "@/lib/hooks/useFavorites";
import FavoringImage from "@/components/FavoringImage";

type FavImagesGridProps = {
    page: number
    successCb: (canLoadMore: boolean) => void
}

/**
 * FavImagesGrid component renders an images grid for Favorites page.
 */
function FavImagesGrid() {
    const userId = useContext(UserIdContext)
    const params: IImagesRequestParams = {order: 'DESC', page: 0, limit: 100, sub_id: userId}

    const {favorites, isFavoritesLoading} = useFavorites(params, undefined)

    const skeletonElems = []
    for (let i = 0; i < 10; i++) {
        skeletonElems.push(<Skeleton key={i} height='170px'/>)
    }

    return (
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