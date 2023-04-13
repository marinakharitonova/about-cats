import React, {memo, useContext} from 'react';
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {FAV_IMAGES_LIMIT} from "@/pages/favorites";
import ImagesGrid from "@/components/ImagesGrid";
import {Skeleton} from "@chakra-ui/react";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useFavorites} from "@/lib/hooks/useFavorites";
import FavoringImage from "@/components/FavoringImage";
import ImagesGridItem from "@/components/ImagesGridItem";
import {IMAGES_LIMIT} from "@/pages/_app";

type FavImagesGridProps = {
    page: number
    successCb: (canLoadMore: boolean) => void
}

type FavGridItemProps = {
    imageId: string
    removingId?: number
    src: string
}

/**
 * FavImagesGrid component renders an images grid for Favorites page.
 */
function FavImagesGrid() {
    const userId = useContext(UserIdContext)
    const params: IImagesRequestParams = {order: 'DESC', page: 0, limit: IMAGES_LIMIT, sub_id: userId}

    const {favorites, isFavoritesLoading} = useFavorites(params, undefined)

    const favItems = favorites && favorites.map(favorite =>
        <FavGridItem key={favorite.image_id} imageId={favorite.image_id} removingId={favorite.id}
                     src={favorite.image.url}/>)

    return (
        <ImagesGrid alertText={`No Favorites yet, just click on one of the images in Vote or Images to 'Fav-it'`}
                    isLoading={isFavoritesLoading}
                    items={favItems}/>

    )
}

/**
 * UploadGridItem component renders a piece of FavImagesGrid.
 */
const FavGridItem = ({imageId, removingId, src}: FavGridItemProps) => {
    return (
        <FavoringImage imageId={imageId} removingId={removingId} size={50} src={src}>
            <ImagesGridItem src={src}/>
        </FavoringImage>
    )
}

export default memo(FavImagesGrid);