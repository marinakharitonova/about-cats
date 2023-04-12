import React from 'react';
import ImagePreloader from "@/components/ImagePreloader";
import Image from "next/image";
import {Box} from "@chakra-ui/react";
import FavoringImage from "@/components/FavoringImage/FavoringImage";

type ImagesGridItemProps = {
    src: string
    imageId: string
    removingId?: number
}

function ImagesGridItem({src, imageId, removingId}: ImagesGridItemProps) {

    return (
        <FavoringImage imageId={imageId} src={src} size={50} removingId={removingId}>
            <Box w="100%" h="170px" pos="relative">
                <ImagePreloader width={'100%'} height={'170px'}>
                    {
                        onLoadCb => <Image
                            src={src}
                            alt="Cat"
                            fill
                            style={{objectFit: "cover"}}
                            onLoadingComplete={onLoadCb}
                            sizes="170px"
                        />
                    }
                </ImagePreloader>
            </Box>
        </FavoringImage>
    );
}

export default ImagesGridItem;