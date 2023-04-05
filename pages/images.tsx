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
import {useSelect} from "@/lib/hooks/useSelect";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {filterParams} from "@/lib/filterParams";

type ImagesProps = {
    fallback: {
        [key: string]: IImage[]
    }
    breeds: IBreed[]
    categories: ICategory[]
}

export const IMAGES_LIMIT = 20

export async function getStaticProps() {
    const params: IImagesRequestParams = {
        limit: IMAGES_LIMIT,
        page: 0,
        mime_types: 'jpg,gif,png',
        has_breeds: 0,
        category_ids: '',
        breed_ids: '',
        order: 'ASC'
    }
    const response = await fetchImages(params)
    const breeds = await fetchBreeds()
    const categories = await fetchCategories()

    return {
        props: {
            fallback: {
                [unstable_serialize(['/api/images', filterParams(params)])]: {
                    images: response.data,
                    imagesCount: response.headers['pagination-count'] ? response.headers['pagination-count'] : null
                }
            },
            breeds,
            categories
        }
    }
}

function Images({fallback, breeds, categories}: ImagesProps) {
    const [cnt, setCnt] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [isDisabled, setIsDisabled] = useState(false)

    const [breed, selectBreed, setBreed] = useSelect('')
    const [category, selectCategory] = useSelect('')
    const [type, selectType] = useSelect('all')
    const [hasBreed, setHasBreed] = useState(false)

    const successCb = (imagesCount: number | null) => {
        setIsLoading(false)
        const displayedImagesCount = IMAGES_LIMIT * cnt + IMAGES_LIMIT
        setIsDisabled(!!(imagesCount && imagesCount <= displayedImagesCount))
    }
    const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectType(e)
        setCnt(1)
    }
    const onBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectBreed(e)
        setCnt(1)
    }
    const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectCategory(e)
        setCnt(1)
    }
    const onHasBreedChange = (hasBreed: boolean) => {
        setHasBreed(hasBreed)
        setCnt(1)
    }

    const pages = []

    for (let i = 0; i < cnt; i++) {
        pages.push(<ImagesGrid key={i} page={i} type={type} hasBreed={hasBreed} category={category} breed={breed}
                               successCb={successCb}/>)
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

            <ImagesFilter breeds={breeds}
                          categories={categories}
                          type={type}
                          breed={breed}
                          category={category}
                          hasBreed={hasBreed}
                          onTypeChange={onTypeChange}
                          onBreedChange={onBreedChange}
                          onCategoryChange={onCategoryChange}
                          onHasBreedChange={onHasBreedChange}
                          setBreed={setBreed}
            />

            <Box>
                <VStack spacing={6}>
                    {pages}
                </VStack>
                <Center mt="30px">
                    <Button colorScheme='blue' onClick={handleLoadMoreClick} isLoading={isLoading}
                            isDisabled={isDisabled}>Load
                        more</Button>
                </Center>
            </Box>
        </SWRConfig>
    );
}

export default Images;