import React, {useMemo} from 'react';
import {Box, Checkbox, Grid} from "@chakra-ui/react";
import {IBreed} from "@/types/IBreed";
import {ICategory} from "@/types/ICategory";
import ImagesSelect from "@/components/ImagesSelect";

const typeOptions = [{id: 'all', name: "All"}, {id: 'static', name: "Static"}, {id: 'animated', name: "Animated"}]

type ImagesFilterProps = {
    breeds: IBreed[]
    categories: ICategory[]
    type: string
    onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    breed: string
    onBreedChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    category: string
    onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
    hasBreed: boolean
    onHasBreedChange: (hasBreed: boolean) => void
    setBreed: React.Dispatch<React.SetStateAction<string>>
}

function ImagesFilter({
                          breeds,
                          categories,
                          type,
                          onTypeChange,
                          breed,
                          onBreedChange,
                          category,
                          onCategoryChange,
                          hasBreed,
                          onHasBreedChange,
                          setBreed
                      }: ImagesFilterProps) {
    const mappedBreeds = useMemo(() => breeds.map(breed => ({id: breed.id, name: breed.name})), [breeds])

    const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            onHasBreedChange(true)
        }
        onBreedChange(e)
    }

    const handleHasBreedChange = () => {
        if (hasBreed) {
            setBreed('')
        }
        onHasBreedChange(!hasBreed)
    }

    return (
        <Grid templateColumns='repeat(2, 1fr)' gap={4} mb={10}>
            <ImagesSelect label={'Type'} options={typeOptions} value={type} onChange={onTypeChange} withPlaceholder={false}/>
            <ImagesSelect label={'Category'} options={categories} value={category}
                          onChange={onCategoryChange}/>

            <Box>
                <Checkbox isChecked={hasBreed} mt={6} onChange={handleHasBreedChange}>With breed</Checkbox>
            </Box>

            <ImagesSelect label={'Breed'} options={mappedBreeds} value={breed} onChange={handleBreedChange}/>
        </Grid>
    );
}

export default ImagesFilter;