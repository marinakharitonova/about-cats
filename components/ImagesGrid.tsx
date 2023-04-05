import React from 'react';
import {imagesFetcher} from "@/lib/fetchers/fetchers";
import {Box, Grid, Text} from "@chakra-ui/react";
import Image from "next/image";
import ImagePreloader from "@/components/ImagePreloader";
import {IMAGES_LIMIT} from "@/pages/images";
import useSWR from "swr";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {filterParams} from "@/lib/filterParams";
import {IImages} from "@/types/IImages";

type ImagesPageProps = {
    page: number
    type: string
    hasBreed: boolean
    category: string
    breed: string
    successCb: (imagesCount: number | null) => void
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
    } = useSWR<IImages>(['/api/images', filterParams(params)], imagesFetcher, {
        onSuccess: data => successCb(data.imagesCount),
        keepPreviousData: true
    })

    return (
        <>
            {
                data && data.images.length > 0 && <Grid templateColumns='repeat(5, 1fr)' gap={6} w='100%'>
                    {data.images.map(image => <ImageWrapper src={image.url} key={image.url}/>)}
                </Grid>
            }

            {
                data && data.images.length === 0 &&
                <Text fontSize='4xl' minH={'752px'} pt={36}>Nothing found. Change your search options.</Text>
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