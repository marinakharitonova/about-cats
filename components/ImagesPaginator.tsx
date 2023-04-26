import React, {memo, useCallback, useState} from 'react';
import {Box, Button, Center, VStack} from "@chakra-ui/react";
import {IMAGES_LIMIT} from "@/pages/_app";

type ImagesPaginatorProps = {
    main: (page: number, successCb: (imagesCount: number) => void) => React.ReactNode
    imagesFilter?: (onFilterChange: () => void) => React.ReactNode
}

/**
 * ImagesPaginator image page rendering, page switch button, optional images filter.
 */
function ImagesPaginator({main, imagesFilter}: ImagesPaginatorProps) {
    const [cnt, setCnt] = useState(1)
    const [isLoading, setIsLoading] = useState(false)

    const [pagesCount, setPagesCount] = useState<null | number>(null)

    const successCb = useCallback((imagesCount: number) => {
        setIsLoading(false)
        const newPagesCount = Math.ceil(imagesCount / IMAGES_LIMIT)
        if (pagesCount === null || newPagesCount !== pagesCount){
            setPagesCount(newPagesCount)
        }
    }, [pagesCount])

    const pages = []

    for (let i = 0; i < cnt; i++) {
        pages.push(main(i, successCb))
    }

    const handleLoadMoreClick = () => {
        setIsLoading(true)
        setCnt(cnt + 1)
    }

    return (
        <>
            {imagesFilter && imagesFilter(() => setCnt(1))}
            <Box>
                <VStack spacing={6} minH={'752px'}>
                    {pages}
                </VStack>
                <Center mt="30px">
                    <Button colorScheme='blue' onClick={handleLoadMoreClick}
                            isLoading={isLoading}
                            isDisabled={pagesCount === cnt || pagesCount === 0}>
                        Load more
                    </Button>
                </Center>
            </Box>
        </>

    );
}

export default memo(ImagesPaginator);