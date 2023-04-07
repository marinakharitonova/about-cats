import {Box, Grid, Text} from "@chakra-ui/react";
import React from "react";
import ImagePreloader from "@/components/ImagePreloader";
import Image from "next/image";
import {IImages} from "@/types/IImages";
import {IFavorites} from "@/types/IFavorites";

type ImagesGridProps = {
    data: IImages | IFavorites | undefined
    alertText: string
}

/**
 * ImagesGrid component renders a five-column image grid from given data.
 * Renders an alert text string if data is empty.
 */
function ImagesGrid({data, alertText}: ImagesGridProps) {
    const imagesElems = data && data.images.map(image => {
        if ('image' in image){
            return <ImageWrapper src={image.image.url} key={image.image.id}/>
        } else {
            return <ImageWrapper src={image.url} key={image.id}/>
        }
    })


    return (
        <>
            {
                data && data?.images?.length > 0 &&
                <Grid templateColumns='repeat(5, 1fr)' gap={6} w='100%' minH={'752px'} alignContent={'flex-start'}>
                    {imagesElems}
                </Grid>
            }

            {
                data && data?.images?.length === 0 &&
                <Text fontSize='4xl' minH={'752px'} pt={36} textAlign={'center'}>{alertText}</Text>
            }

        </>
    );
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