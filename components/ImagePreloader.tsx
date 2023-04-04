import React, {useState} from 'react';
import {Skeleton} from "@chakra-ui/react";

type ImagePreloaderProps = {
    width: string
    height: string
    render: (onLoadingCb: () => void) => React.ReactNode
}

/**
 * ImagePreloader component wraps the image displayed by the render-parameter function with a Skeleton component.
 */
function ImagePreloader({width, height, render}: ImagePreloaderProps) {
    const [isLoaded, setIsLoaded] = useState(false)
    return (
        <Skeleton w={width} h={height} isLoaded={isLoaded} pos="relative">
            {render(() => setIsLoaded(true))}
        </Skeleton>
    );
}

export default ImagePreloader;