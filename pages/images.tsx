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
import {IMAGES_LIMIT} from "@/pages/_app";

type ImagesProps = {
    fallback: {
        [key: string]: IImages
    }
    breeds: IBreed[]
    categories: ICategory[]
}

export type SelectOrder = 'ASC' | 'DESC'

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

/**
 * Images page renders a list of images with the ability to filter
 * by image type, by breed of cat in the image, by image category, by image output order.
 */
function Images({fallback, breeds, categories}: ImagesProps) {
    const [breed, selectBreed, setBreed] = useSelect('' as string)
    const [category, selectCategory] = useSelect('')
    const [type, selectType] = useSelect('all')
    const [hasBreed, setHasBreed] = useState(false)
    const [order, selectOrder] = useSelect<SelectOrder>('ASC')

    return (
        <SWRConfig value={{fallback, revalidateOnFocus: false}}>
            <Head>
                <title>Thousands of cat images</title>
                <meta
                    name="description"
                    content="Browse thousands of cute cat pictures: cats in boxes, cats in clothes, cats in sinks."
                    key="desc"
                />
            </Head>

            <ImagesPaginator
                imagesFilter={
                    (onFilterChange) => {
                        return <ImagesFilter breeds={breeds}
                                             categories={categories}
                                             type={type}
                                             breed={breed}
                                             category={category}
                                             hasBreed={hasBreed}
                                             onTypeChange={e => {
                                                 onFilterChange()
                                                 selectType(e)
                                             }}
                                             onBreedChange={e => {
                                                 onFilterChange()
                                                 selectBreed(e)
                                             }}
                                             onCategoryChange={e => {
                                                 onFilterChange()
                                                 selectCategory(e)
                                             }}
                                             onHasBreedChange={() => {
                                                 onFilterChange()
                                                 setHasBreed(prevState => !prevState)
                                             }}
                                             setBreed={setBreed}
                                             setHasBreed={setHasBreed}
                                             order={order}
                                             onOrderChange={e => {
                                                 onFilterChange()
                                                 selectOrder(e)
                                             }}
                        />
                    }
                }
                main={
                    (page: number, successCb: (imagesCount: number) => void) =>
                        <MainImagesGrid
                            key={page}
                            breed={breed}
                            category={category}
                            hasBreed={hasBreed}
                            page={page}
                            type={type}
                            order={order}
                            successCb={successCb}
                        />
                }
            />
        </SWRConfig>
    );
}

export default Images;