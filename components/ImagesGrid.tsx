import {Grid, Skeleton, Text} from "@chakra-ui/react";
import React from "react";
import ImagesGridItem from "@/components/ImagesGridItem";
import {IImage} from "@/types/IImage";
import {IFavorite} from "@/types/IFavorite";
import {IUpload} from "@/types/IUpload";

type ImagesGridProps = {
    items: JSX.Element[] | undefined
    alertText: string
    style?: React.CSSProperties
    isLoading?: boolean
}

const skeletonElems = [] as JSX.Element[]
for (let i = 0; i < 10; i++) {
    skeletonElems.push(<Skeleton key={i} height='170px'/>)
}

/**
 * ImagesGrid component renders a five-column image grid from given JSX Elements array.
 * Renders an alert text string if array is empty.
 * Renders a preloader if data for array is loading.
 */
function ImagesGrid({items, alertText, style, isLoading}: ImagesGridProps) {
    return (
        <>
            {
                isLoading &&
                <Grid templateColumns='repeat(5, 1fr)' gap={6} w='100%' alignContent={'flex-start'} minH={'752px'}>
                    {skeletonElems}
                </Grid>
            }
            {
                items && items.length > 0 &&
                <Grid templateColumns='repeat(5, 1fr)' gap={6} w='100%' style={style}>
                    {items}
                </Grid>
            }
            {
                items?.length === 0 &&
                <Text fontSize='4xl' pt={36} textAlign={'center'} style={style}>{alertText}</Text>
            }
        </>
    );
}

export default ImagesGrid;