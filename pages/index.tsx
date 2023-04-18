import Head from 'next/head'
import VotingImage from "@/components/VotingImage";
import VotingButtons from "@/components/VotingButtons";
import {Wrap} from "@chakra-ui/react";
import React from "react";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {fetchImages} from "@/lib/fetchImges";
import {unstable_serialize} from "swr";
import {collectImagesData} from "@/lib/collectImagesData";
import {SWRConfig} from "swr/_internal";
import {IImages} from "@/types/IImages";
import Error from "./_error"

type HomeProps = {
    fallback: {
        [key: string]: IImages
    }
    errorCode: number
}

export const RANDOM_IMAGE_REQUEST_PARAMS: IImagesRequestParams = {order: 'RANDOM', size: 'med'}

export async function getServerSideProps() {
    const imagesResponse = await fetchImages(RANDOM_IMAGE_REQUEST_PARAMS)
    const errorCode = imagesResponse.statusText === "OK" ? false : imagesResponse.status

    return {
        props: {
            errorCode,
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
export default function Home({fallback, errorCode}: HomeProps) {

    const content = errorCode
        ? <Error statusCode={errorCode}/>
        : <Wrap spacing='12px' direction='column'>
            <VotingImage/>
            <VotingButtons/>
        </Wrap>

    return (
        <SWRConfig value={{fallback}}>
            <Head>
                <title>Vote for the most cutest cat image</title>
                <meta
                    name="description"
                    content="Vote for or against an image of a cat."
                    key="desc"
                />
            </Head>
            {content}
        </SWRConfig>

    )
}
