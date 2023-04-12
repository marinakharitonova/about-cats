import React from 'react';
import Head from "next/head";
import FavImagesGrid from "@/components/FavImagesGrid";
import ImagesPaginator from "@/components/ImagesPaginator";

export const FAV_IMAGES_LIMIT = 20

function Favorites() {
    return (
        <>
            <Head>
                <title>Favorites images</title>
            </Head>

            <ImagesPaginator main={(page: number, successCb: (canLoadMore: boolean) => void) =>
                <FavImagesGrid key={page} page={page} successCb={successCb}/>}/>
        </>
    );
}

export default Favorites;