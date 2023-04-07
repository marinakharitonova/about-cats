import React from 'react';
import ImagePreloader from "@/components/ImagePreloader";
import Image from "next/image";
import {Box} from "@chakra-ui/react";
import FavoringImage from "@/components/FavoringImage/FavoritingImage";

type ImagesGridItemProps = {
    src: string
    imageId: string
}

function ImagesGridItem({src, imageId}: ImagesGridItemProps) {

    return (
        <FavoringImage imageId={imageId} isDisabled={false} onClick={() => {}}>
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