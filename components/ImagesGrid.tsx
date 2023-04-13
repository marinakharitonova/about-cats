import {Grid, Skeleton, Text} from "@chakra-ui/react";
import React from "react";
import ImagesGridItem from "@/components/ImagesGridItem";
import {IImage} from "@/types/IImage";
import {IFavorite} from "@/types/IFavorite";
import {IUpload} from "@/types/IUpload";

type ImagesGridProps = {
    children: (innerChildren: React.ReactNode, imageId: string, removingId?: number, src?: string) => React.ReactNode,
    images: IImage[] | IFavorite[] | IUpload[] | undefined
    alertText: string
    style?: React.CSSProperties
    isLoading?: boolean
}

const skeletonElems = [] as JSX.Element[]
for (let i = 0; i < 10; i++) {
    skeletonElems.push(<Skeleton key={i} height='170px'/>)
}

/**
 * ImagesGrid component renders a five-column image grid from given data.
 * Renders an alert text string if data is empty.
 */
function ImagesGrid({images, alertText, style, children, isLoading}: ImagesGridProps) {
    return (
        <>
            {
                isLoading &&
                <Grid templateColumns='repeat(5, 1fr)' gap={6} w='100%' alignContent={'flex-start'} minH={'752px'}>
                    {skeletonElems}
                </Grid>
            }
            {
                images && images.length > 0 &&
                <Grid templateColumns='repeat(5, 1fr)' gap={6} w='100%' style={style}>
                    {images && images.map(image => {
                        if ('image' in image) {
                            const innerChildren = <ImagesGridItem src={image.image.url}/>
                            return children(innerChildren, image.image.id, image.id, image.image.url)
                        } else {
                            const innerChildren = <ImagesGridItem src={image.url}/>
                            return children(innerChildren, image.id, undefined, image.url)
                        }
                    })}
                </Grid>
            }
            {
                images && images.length === 0 &&
                <Text fontSize='4xl' pt={36} textAlign={'center'}>{alertText}</Text>
            }
        </>
    );
}

export default ImagesGrid;