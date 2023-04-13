import React, {memo, useState} from 'react';
import {IMAGES_LIMIT, SelectOrder} from "@/pages/images";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import ImagesGrid from "@/components/ImagesGrid";
import {canLoadMore} from "@/lib/canLoadMore";
import {useImages} from "@/lib/hooks/useImages";
import FavoringImage from "@/components/FavoringImage";
import ImagesGridItem from "@/components/ImagesGridItem";

type ImagesPageProps = {
    page: number
    type: string
    hasBreed: boolean
    category: string
    breed: string
    order: SelectOrder
    successCb: (canLoadMore: boolean) => void
}

type MainGridItemProps = {
    imageId: string
    src: string
}

/**
 * MainImagesGrid component renders an images grid for Images page.
 */
function MainImagesGrid({page, type, hasBreed, successCb, category, breed, order}: ImagesPageProps) {
    const [isFallbackData, setIsFallbackData] = useState(true)

    const params: IImagesRequestParams = {
        page,
        limit: IMAGES_LIMIT,
        mime_types: type === 'static' ? 'jpg,png' : type === 'animated' ? 'gif' : 'jpg,gif,png',
        has_breeds: hasBreed ? 1 : 0,
        category_ids: category,
        breed_ids: breed,
        order: order
    }

    const {
        images,
        isValidating
    } = useImages(params, {
        onSuccess: data => {
            successCb(canLoadMore(IMAGES_LIMIT, page, data.imagesCount))
            setIsFallbackData(false)
        }
    })

    const imagesItems = images && images.map(image =>
        <MainGridItem key={image.id} imageId={image.id} src={image.url}/>)

    return (
        <ImagesGrid items={imagesItems}
                    alertText={'Nothing found. Change your search options.'}
                    style={{opacity: isFallbackData ? '1' : isValidating ? '0.7' : '1'}}/>
    )
}

/**
 * MainGridItem component renders a piece of MainImagesGrid.
 */
const MainGridItem = ({imageId, src}: MainGridItemProps) => {
    return (
        <FavoringImage imageId={imageId} size={50} src={src}>
            <ImagesGridItem src={src}/>
        </FavoringImage>
    )
}

export default memo(MainImagesGrid);

