import React from 'react';
import Head from "next/head";
import FavImagesGrid from "@/components/FavImagesGrid";
import {VStack} from "@chakra-ui/react";

/**
 * Favorites page renders list of images added to favorites.
 */
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