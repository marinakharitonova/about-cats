import React, {memo} from 'react';
import {imagesFetcher} from "@/lib/fetchers/fetchers";
import {IMAGES_LIMIT} from "@/pages/images";
import useSWR from "swr";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {filterParams} from "@/lib/filterParams";
import {IImages} from "@/types/IImages";
import ImagesGrid from "@/components/ImagesGrid";
import {canLoadMore} from "@/lib/canLoadMore";

type ImagesPageProps = {
    page: number
    type: string
    hasBreed: boolean
    category: string
    breed: string
    successCb: (canLoadMore: boolean) => void
}

/**
 * MainImagesGrid component renders an images grid for Images page.
 */
function MainImagesGrid({page, type, hasBreed, successCb, category, breed}: ImagesPageProps) {
    const params: IImagesRequestParams = {
        page,
        limit: IMAGES_LIMIT,
        mime_types: type === 'static' ? 'jpg,png' : type === 'animated' ? 'gif' : 'jpg,gif,png',
        has_breeds: hasBreed ? 1 : 0,
        category_ids: category,
        breed_ids: breed,
        order: 'ASC'
    }

    const {
        data
    } = useSWR<IImages>(['/api/images', filterParams(params)], imagesFetcher, {
        onSuccess: data => successCb(canLoadMore(IMAGES_LIMIT, page, data.imagesCount)),
        keepPreviousData: true
    })

    return <ImagesGrid data={data} alertText={'Nothing found. Change your search options.'}/>
}

export default memo(MainImagesGrid);

