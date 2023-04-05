import React from 'react';
import {imagesFetcher} from "@/lib/fetchers/fetchers";
import {IImage} from "@/types/Iimage";
import {Box, Grid} from "@chakra-ui/react";
import Image from "next/image";
import ImagePreloader from "@/components/ImagePreloader";
import {IMAGES_LIMIT} from "@/pages/images";
import useSWRImmutable from "swr/immutable";
import useSWR from "swr";

type ImagesPageProps = {
    index: number,
    successCb: () => void
}

/**
 * ImagesGrid component renders a five-column image grid.
 */
function ImagesGrid({index, successCb}: ImagesPageProps) {

    const {
        data
    } = useSWR<IImage[]>(['/api/images', {
        page: index,
        limit: IMAGES_LIMIT
    }], imagesFetcher, {onSuccess: successCb})

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