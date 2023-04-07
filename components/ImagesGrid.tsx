import {Grid, Text} from "@chakra-ui/react";
import React, {useContext} from "react";
import {IImages} from "@/types/IImages";
import {IFavorites} from "@/types/IFavorites";
import ImagesGridItem from "@/components/ImagesGridItem";
import {FavoritesContext} from "@/lib/context/FavoritesContext";
import FavoringImage from "@/components/FavoringImage/FavoritingImage";

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
            return <ImagesGridItem src={image.image.url} key={image.image.id} imageId={image.image.id}/>
        } else {
            return <ImagesGridItem src={image.url} key={image.id} imageId={image.id}/>
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