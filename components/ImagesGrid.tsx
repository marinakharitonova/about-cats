import React from 'react';
import {imagesFetcher} from "@/lib/fetchers/fetchers";
import {IImage} from "@/types/Iimage";
import {Box, Grid} from "@chakra-ui/react";
import Image from "next/image";
import ImagePreloader from "@/components/ImagePreloader";
import {IMAGES_LIMIT} from "@/pages/images";
import useSWR from "swr";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {filterParams} from "@/lib/filterParams";

type ImagesPageProps = {
    page: number
    type: string
    hasBreed: boolean
    category: string
    breed: string
    successCb: () => void
}

/**
 * ImagesGrid component renders a five-column image grid.
 */
function ImagesGrid({page, type, hasBreed, successCb, category, breed}: ImagesPageProps) {
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
    } = useSWR<IImage[]>(['/api/images', filterParams(params)], imagesFetcher, {onSuccess: successCb, revalidateOnMount: false})

    console.log(data);

    return (
        <>
            {
                data && <Grid templateColumns='repeat(5, 1fr)' gap={6} w='100%'>
                    {data.map(image => <ImageWrapper src={image.url} key={image.url}/>)}
                </Grid>
            }

        </>
    )
}

export default ImagesGrid;

type ImageWrapperProps = {
    src: string
}

export const ImageWrapper = ({src}: ImageWrapperProps) => {
    return (
        <Box w="100%" h="170px" pos="relative">
            <ImagePreloader width={'100%'} height={'170px'} render={(onLoadingCb) => <Image
                src={src}
                alt="Cat"
                fill
                style={{objectFit: "cover"}}
                onLoadingComplete={onLoadingCb}
                sizes="170px"
            />}/>
        </Box>
    )
}