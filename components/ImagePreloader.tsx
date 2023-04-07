import React, {useState} from 'react';
import {Skeleton} from "@chakra-ui/react";

type ImagePreloaderProps = {
    width: string
    height: string
    children: (onLoadCb: () => void) => React.ReactNode
}

/**
 * ImagePreloader component wraps the image displayed by the render-parameter function with a Skeleton component.
 */
function ImagePreloader({width, height, children}: ImagePreloaderProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    return (
        <Skeleton w={width} h={height} isLoaded={isLoaded} pos="relative">
            {children(() => setIsLoaded(true))}
        </Skeleton>
    );
}

export default ImagePreloader;