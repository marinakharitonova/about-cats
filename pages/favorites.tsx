import React from 'react';
import Head from "next/head";
import FavImagesGrid from "@/components/FavImagesGrid";
import {VStack} from "@chakra-ui/react";

export const FAV_IMAGES_LIMIT = 20

function Favorites() {
    return (
        <>
            <Head>
                <title>Favorites images</title>
            </Head>

            <VStack spacing={6} minH={'752px'}>
                <FavImagesGrid/>
            </VStack>
        </>
    );
}

export default Favorites;