import React, {useMemo, useState} from 'react';
import {Box, Checkbox, Grid, Select, Text} from "@chakra-ui/react";
import {useSelect} from "@/lib/hooks/useSelect";
import {IBreed} from "@/types/IBreed";
import {ICategory} from "@/types/ICategory";

type ImagesFilterProps = {
    breeds: IBreed[]
    categories: ICategory[]
}

function ImagesFilter({breeds, categories}: ImagesFilterProps) {
    const breedOptions = useMemo(() =>
        breeds.map(breed => <option key={breed.id} value={breed.id}>{breed.name}</option>), [breeds])

    const categoryOptions = useMemo(() =>
        categories.map(category => <option key={category.id}
                                           value={category.id}>{category.name}</option>), [categories])

    const [breed, selectBreed] = useSelect('')
    const [category, selectCategory] = useSelect('')
    const [type, selectType] = useSelect('all')
    const [hasBreed, setHasBreed] = useState(false)

    return (
        <Grid templateColumns='repeat(2, 1fr)' gap={4} mb={10}>
            <Box>
                <Text fontSize='md' mb={1}>Type</Text>
                <Select value={type} onChange={selectType}>
                    <option value='all'>All</option>
                    <option value='static'>Static</option>
                    <option value='animated'>Animated</option>
                </Select>
            </Box>
            <Box>
                <Text fontSize='md' mb={1}>Category</Text>
                <Select placeholder='None' value={category} onChange={selectCategory}>
                    {categoryOptions}
                </Select>
            </Box>
            <Box>
                <Checkbox isChecked={hasBreed} mt={6} onChange={() => setHasBreed(!hasBreed)}>With breed</Checkbox>
            </Box>
            <Box>
                <Text fontSize='md' mb={1}>Breed</Text>
                <Select placeholder='None' value={breed} onChange={(e) => {
                    if (e.target.value) {
                        setHasBreed(true)
                    }
                    selectBreed(e)
                }}>
                    {breedOptions}
                </Select>
            </Box>
        </Grid>
    );
}

export default ImagesFilter;