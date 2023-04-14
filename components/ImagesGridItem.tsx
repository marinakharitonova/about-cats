import React from 'react';
import ImagePreloader from "@/components/ImagePreloader";
import Image from "next/image";
import {Box} from "@chakra-ui/react";

type ImagesGridItemProps = {
    src: string
}

/**
 * ImagesGridItem renders am image item for ImagesGrid.
 */
function ImagesGridItem({src}: ImagesGridItemProps) {

    return (
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
    );
}

export default ImagesGridItem;