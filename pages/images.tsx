import React, {useState} from 'react';
import Head from "next/head";
import {unstable_serialize} from "swr";
import {Box, Button, Center, Select, VStack, Text, Grid} from "@chakra-ui/react";
import {SWRConfig} from "swr/_internal";
import {IImage} from "@/types/Iimage";
import {fetchImages} from "@/lib/fetchImges";
import ImagesGrid from "@/components/ImagesGrid";

type ImagesProps = {
    fallback: {
        [key: string]: IImage[]
    }
}

export const IMAGES_LIMIT = 20

export async function getStaticProps() {
    const params = {
        limit: IMAGES_LIMIT,
        page: 0
    }
    const response = await fetchImages(params)

    return {
        props: {
            fallback: {
                [unstable_serialize(['/api/images', params])]: response.data
            }
        }
    }
}

function Images({fallback}: ImagesProps) {
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

            <Grid templateColumns='repeat(2, 1fr)' gap={4} mb={10}>
                <Box>
                    <Text fontSize='md'>Order</Text>
                    <Select placeholder='Select option'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </Box>

                <Box>
                    <Text fontSize='md'>Type</Text>
                    <Select placeholder='Select option'>
                        <option value='all'>All</option>
                        <option value='static'>Static</option>
                        <option value='animated'>Animated</option>
                    </Select>
                </Box>
                <Box>
                    <Text fontSize='md'>Breed</Text>
                    <Select placeholder='Select option'>
                        <option value='option1'>Option 1</option>
                        <option value='option2'>Option 2</option>
                        <option value='option3'>Option 3</option>
                    </Select>
                </Box>
                <Box>
                    <Text fontSize='md'>Category</Text>
                    <Select placeholder='Select option'>
                        <option value='none'>None</option>
                        <option value='sinks'>Sinks</option>
                        <option value='boxes'>Boxes</option>
                        <option value='boxes'>Boxes</option>
                    </Select>
                </Box>
            </Grid>


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