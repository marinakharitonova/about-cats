import React, {useState} from 'react';
import Head from "next/head";
import {unstable_serialize} from "swr";
import {Box, Button, Center, VStack} from "@chakra-ui/react";
import {SWRConfig} from "swr/_internal";
import {IImage} from "@/types/Iimage";
import {fetchImages} from "@/lib/fetchImges";
import ImagesGrid from "@/components/ImagesGrid";
import ImagesFilter from "@/components/ImagesFilter";
import {fetchBreeds} from "@/lib/fetchBreeds";
import {IBreed} from "@/types/IBreed";
import {fetchCategories} from "@/lib/fetchCategories";
import {ICategory} from "@/types/ICategory";

type ImagesProps = {
    fallback: {
        [key: string]: IImage[]
    }
    breeds: IBreed[]
    categories: ICategory[]
}

export const IMAGES_LIMIT = 20

export async function getStaticProps() {
    const params = {
        limit: IMAGES_LIMIT,
        page: 0
    }
    const response = await fetchImages(params)
    const breeds = await fetchBreeds()
    const categories = await fetchCategories()

    return {
        props: {
            fallback: {
                [unstable_serialize(['/api/images', params])]: response.data
            },
            breeds,
            categories
        }
    }
}

function Images({fallback, breeds, categories}: ImagesProps) {
    const [cnt, setCnt] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const pages = []

    for (let i = 0; i <= cnt; i++) {
        pages.push(<ImagesGrid index={i} key={i} successCb={() => setIsLoading(false)}/>)
    }

    const handleLoadMoreClick = () => {
        setCnt(cnt + 1)
        setIsLoading(true)
    }

    return (
        <SWRConfig value={{fallback, revalidateOnFocus: false}}>
            <Head>
                <title>Cats images</title>
            </Head>

            <ImagesFilter breeds={breeds} categories={categories}/>

            <Box>
                <VStack spacing={6}>
                    {pages}
                </VStack>
                <Center mt="30px">
                    <Button colorScheme='blue' onClick={handleLoadMoreClick} isLoading={isLoading}>Load more</Button>
                </Center>
            </Box>
        </SWRConfig>
    );
}

export default Images;