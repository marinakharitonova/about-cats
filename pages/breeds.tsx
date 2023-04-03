import {unstable_serialize} from 'swr'
import {SWRConfig} from "swr/_internal";
import Head from "next/head";
import React, {useState} from "react";
import {Container, Select} from "@chakra-ui/react";
import BreedCard from "@/components/BreedCard";
import {IBreed} from "@/types/IBreed";
import {IImage} from "@/types/Iimage";
import {BREEDS_IMAGES_COUNT, DEFAULT_BREED_ID, fetchBreed, fetchBreedImages, fetchBreeds} from "@/lib/fetchBreedsPage";

type BreedsProps = {
    breeds: IBreed[],
    fallback: {
        [key: string]: IBreed | IImage[]
    }
}

export async function getStaticProps() {
    const breedInfo = await fetchBreed()
    const breedImages = await fetchBreedImages()
    const breeds = await fetchBreeds()

    return {
        props: {
            fallback: {
                [unstable_serialize(['/api/images', {
                    limit: BREEDS_IMAGES_COUNT,
                    breed_ids: DEFAULT_BREED_ID
                }])]: breedImages,
                ['/api/breeds/' + DEFAULT_BREED_ID]: breedInfo
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
        <SWRConfig value={{fallback, keepPreviousData: true, revalidateOnFocus: false}}>
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