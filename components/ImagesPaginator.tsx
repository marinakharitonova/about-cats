import React, {memo, useCallback, useState} from 'react';
import {Box, Button, Center, VStack} from "@chakra-ui/react";

type ImagesPaginatorProps = {
    children: (page: number, successCb: (canLoadMore: boolean) => void) => React.ReactNode
}

function ImagesPaginator({children}: ImagesPaginatorProps) {
    const [cnt, setCnt] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [canLoadMore, setCanLoadMore] = useState(false)

    const successCb = useCallback((canLoadMore: boolean) => {
        setIsLoading(false)
        setCanLoadMore(canLoadMore)
    }, [])

    const pages = []

    for (let i = 0; i < cnt; i++) {
        pages.push(children(i, successCb))
    }

    const handleLoadMoreClick = () => {
        setIsLoading(true)
        setCnt(cnt + 1)
    }

    return (
        <Box>
            <VStack spacing={6} minH={'752px'}>
                {pages}
            </VStack>
            <Center mt="30px">
                <Button colorScheme='blue' onClick={handleLoadMoreClick} isLoading={isLoading}
                        isDisabled={!canLoadMore}>
                    Load more
                </Button>
            </Center>
        </Box>
    );
}

export default memo(ImagesPaginator);