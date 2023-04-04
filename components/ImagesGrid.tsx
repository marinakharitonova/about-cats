import React from 'react';
import useSWR from "swr";
import {imagesFetcher} from "@/lib/fetchers/fetchers";
import {IImage} from "@/types/Iimage";
import {Box, Grid} from "@chakra-ui/react";
import Image from "next/image";
import ImagePreloader from "@/components/ImagePreloader";
import {IMAGES_LIMIT} from "@/pages/images";

type ImagesPageProps = {
    index: number,
    successCb: () => void
}

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

/**
 * ImagesGrid component renders a five-column image grid.
 */
function ImagesGrid({index, successCb}: ImagesPageProps) {

    const {
        data
    } = useSWR<IImage[]>(['/api/images', {
        page: index,
        limit: IMAGES_LIMIT
    }], imagesFetcher, {onSuccess: successCb, revalidateOnMount: false})

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