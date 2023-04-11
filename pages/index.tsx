import Head from 'next/head'
import VotingImage from "@/components/VotingImage";
import VotingButtons from "@/components/VotingButtons";
import {Wrap} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {fetchImages} from "@/lib/fetchImges";
import {unstable_serialize} from "swr";
import {collectImagesData} from "@/lib/collectImagesData";
import {SWRConfig} from "swr/_internal";
import {IImages} from "@/types/IImages";
import {useRouter} from "next/router";
import Loading from "@/components/Loading";

type HomeProps = {
    fallback: {
        [key: string]: IImages
    }
}

export const RANDOM_IMAGE_REQUEST_PARAMS: IImagesRequestParams = {order: 'RANDOM', size: 'med'}

export async function getServerSideProps() {
    const imagesResponse = await fetchImages(RANDOM_IMAGE_REQUEST_PARAMS)

    return {
        props: {
            fallback: {
                [unstable_serialize(['/api/images', RANDOM_IMAGE_REQUEST_PARAMS])]: collectImagesData(imagesResponse)
            }
        }
    }
}

/**
 * Home page renders a random cat image and a group of buttons to interact with the image:
 * vote (up and down)
 * add/remove to favorites
 */
export default function Home({fallback}: HomeProps) {

    return (
        <SWRConfig value={{fallback}}>
            <Head>
                <title>Vote for the most cutest cat!</title>
            </Head>

            <Wrap spacing='12px' direction='column'>
                <VotingImage/>
                <VotingButtons/>
            </Wrap>
        </SWRConfig>

    )
}
