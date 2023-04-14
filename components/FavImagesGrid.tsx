import React, {memo, useContext} from 'react';
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import ImagesGrid from "@/components/ImagesGrid";
import {UserIdContext} from "@/lib/context/UserIdContext";
import {useFavorites} from "@/lib/hooks/useFavorites";
import ImagesGridItem from "@/components/ImagesGridItem";
import FavoritesPicker from "@/components/FavoritesPicker";

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
    const params: IImagesRequestParams = {order: 'DESC', page: 0, limit: 100, sub_id: userId}

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
        <FavoritesPicker imageId={imageId} removingId={removingId} size={50} src={src}>
            <ImagesGridItem src={src}/>
        </FavoritesPicker>
    )
}

export default memo(FavImagesGrid);