import {unstable_serialize} from 'swr'
import {SWRConfig} from "swr/_internal";
import Head from "next/head";
import React, {useState} from "react";
import {Container, Select} from "@chakra-ui/react";
import BreedCard from "@/components/BreedCard";
import {IBreed} from "@/types/IBreed";
import {fetchBreeds} from "@/lib/fetchBreeds";
import {fetchBreedById} from "@/lib/fetchBreedById";
import {fetchImages} from "@/lib/fetchImges";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {collectImagesData} from "@/lib/collectImagesData";
import {IImages} from "@/types/IImages";

export const BREEDS_IMAGES_COUNT = 5
const DEFAULT_BREED_ID = 'abys'

type BreedsProps = {
    breeds: IBreed[],
    fallback: {
        [key: string]: IBreed | IImages
    }
}

export async function getStaticProps() {
    const params: IImagesRequestParams = {breed_ids: DEFAULT_BREED_ID, limit: BREEDS_IMAGES_COUNT, order: "ASC", size: 'med'}
    const breedResponse = await fetchBreedById(DEFAULT_BREED_ID)
    const imagesResponse = await fetchImages(params)
    const breeds = await fetchBreeds()

    return {
        props: {
            fallback: {
                [unstable_serialize(['/api/images', params])]: collectImagesData(imagesResponse),
                ['/api/breeds/' + DEFAULT_BREED_ID]: breedResponse.data
            },
            breeds
        }
    }
}

/**
 * Breeds page renders a card with information about the breed of a cat and a select for choosing a breed.
 */
export default function Breeds({fallback, breeds}: BreedsProps) {
    const [breedId, setBreedId] = useState(DEFAULT_BREED_ID)
    const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBreedId(e.target.value)
    }
    return (
        <SWRConfig value={{fallback}}>
            <Head>
                <title>Popular cat breeds</title>
                <meta
                    name="description"
                    content="All information about the most popular cat breeds: Abyssinian, British, Persian and many others."
                    key="desc"
                />
            </Head>

            <Container maxW='3xl'>
                <Select mb='36px' onChange={handleBreedChange}>
                    {breeds.map(breed => <option value={breed.id} key={breed.id}>{breed.name}</option>)}
                </Select>

                <BreedCard breedId={breedId}/>
            </Container>
        </SWRConfig>
    )
}