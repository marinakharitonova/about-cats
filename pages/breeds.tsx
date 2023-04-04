import {unstable_serialize} from 'swr'
import {SWRConfig} from "swr/_internal";
import Head from "next/head";
import React, {useState} from "react";
import {Container, Select} from "@chakra-ui/react";
import BreedCard from "@/components/BreedCard";
import {IBreed} from "@/types/IBreed";
import {IImage} from "@/types/Iimage";
import {fetchBreeds} from "@/lib/fetchBreeds";
import {fetchBreedById} from "@/lib/fetchBreedById";
import {fetchImages} from "@/lib/fetchImges";

export const BREEDS_IMAGES_COUNT = 5
const DEFAULT_BREED_ID = 'abys'

type BreedsProps = {
    breeds: IBreed[],
    fallback: {
        [key: string]: IBreed | IImage[]
    }
}

export async function getStaticProps() {
    const params = {breed_ids: DEFAULT_BREED_ID, limit: BREEDS_IMAGES_COUNT}
    const breedResponse = await fetchBreedById(DEFAULT_BREED_ID)
    const imagesResponse = await fetchImages(params)
    const breeds = await fetchBreeds()

    return {
        props: {
            fallback: {
                [unstable_serialize(['/api/images', params])]: imagesResponse.data,
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
    return (
        <SWRConfig value={{fallback, keepPreviousData: true, revalidateOnFocus: false, revalidateOnMount: false}}>
            <Head>
                <title>Breeds</title>
            </Head>

            <Container maxW='3xl'>
                <Select mb='36px' onChange={(e) => {
                    setBreedId(e.target.value)
                }}>
                    {breeds.map(breed => <option value={breed.id} key={breed.id}>{breed.name}</option>)}
                </Select>

                <BreedCard breedId={breedId}/>
            </Container>
        </SWRConfig>
    )
}