import React, {useState} from 'react';
import Head from "next/head";
import {unstable_serialize} from "swr";
import {SWRConfig} from "swr/_internal";
import {fetchImages} from "@/lib/fetchImges";
import ImagesFilter from "@/components/ImagesFilter";
import {fetchBreeds} from "@/lib/fetchBreeds";
import {IBreed} from "@/types/IBreed";
import {fetchCategories} from "@/lib/fetchCategories";
import {ICategory} from "@/types/ICategory";
import {useSelect} from "@/lib/hooks/useSelect";
import {IImagesRequestParams} from "@/types/IImagesRequestParams";
import {filterParams} from "@/lib/filterParams";
import ImagesPaginator from "@/components/ImagesPaginator";
import MainImagesGrid from "@/components/MainImagesGrid";
import {collectImagesData} from "@/lib/collectImagesData";
import {IImages} from "@/types/IImages";

type ImagesProps = {
    fallback: {
        [key: string]: IImages
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
    const imagesResponse = await fetchImages(params)
    const breeds = await fetchBreeds()
    const categories = await fetchCategories()

    return {
        props: {
            fallback: {
                [unstable_serialize(['/api/images', filterParams(params)])]: collectImagesData(imagesResponse)
            },
            breeds,
            categories
        }
    }
}

function Images({fallback, breeds, categories}: ImagesProps) {
    const [breed, selectBreed, setBreed] = useSelect('')
    const [category, selectCategory] = useSelect('')
    const [type, selectType] = useSelect('all')
    const [hasBreed, setHasBreed] = useState(false)

    const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectType(e)
    }
    const onBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectBreed(e)
    }
    const onCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        selectCategory(e)
    }
    const onHasBreedChange = (hasBreed: boolean) => {
        setHasBreed(hasBreed)
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

            <ImagesPaginator>
                {(page: number, successCb: (canLoadMore: boolean) => void) =>
                   <MainImagesGrid
                       key={page}
                       breed={breed}
                       category={category}
                       hasBreed={hasBreed}
                       successCb={successCb}
                       page={page}
                       type={type}
                   />}
            </ImagesPaginator>
        </SWRConfig>
    );
}

export default Images;