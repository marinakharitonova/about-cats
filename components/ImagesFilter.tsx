import React, {useMemo} from 'react';
import {Box, Checkbox, Grid} from "@chakra-ui/react";
import {IBreed} from "@/types/IBreed";
import {ICategory} from "@/types/ICategory";
import ImagesSelect from "@/components/ImagesSelect";
import {SelectOrder} from "@/pages/images";

const typeOptions = [{id: 'all', name: "All"}, {id: 'static', name: "Static"}, {id: 'animated', name: "Animated"}]
const orderOptions: { id: SelectOrder, name: string }[] =
    [
        {id: 'DESC', name: "First new"},
        {id: 'ASC', name: "First old"}
    ]

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
    onHasBreedChange: () => void
    setBreed: React.Dispatch<React.SetStateAction<string>>
    setHasBreed: React.Dispatch<React.SetStateAction<boolean>>
    order: SelectOrder
    onOrderChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}
/**
 * ImagesFilter renders a filter for the Images page:
 * image type select, breed select, image order select, image category select,
 * checkbox indicating whether cats have a breed.
 */
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
                          setBreed,
                          setHasBreed,
                          order,
                          onOrderChange
                      }: ImagesFilterProps) {
    const mappedBreeds = useMemo(() => breeds.map(breed => ({id: breed.id, name: breed.name})), [breeds])

    const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (e.target.value) {
            setHasBreed(true)
        }
        onBreedChange(e)
    }

    const handleHasBreedChange = () => {
        if (hasBreed) {
            setBreed('')
        }
        onHasBreedChange()
    }

    return (
        <Grid templateColumns='repeat(2, 1fr)' gap={4} mb={10}>
            <ImagesSelect label={'Type'} options={typeOptions} value={type} onChange={onTypeChange}
                          withPlaceholder={false}/>
            <ImagesSelect label={'Category'} options={categories} value={category}
                          onChange={onCategoryChange}/>
            <ImagesSelect label={'Order'} options={orderOptions} value={order} onChange={onOrderChange}
                          withPlaceholder={false}/>

            <ImagesSelect label={'Breed'} options={mappedBreeds} value={breed} onChange={handleBreedChange}/>
            <Box>
                <Checkbox isChecked={hasBreed} mt={6} onChange={handleHasBreedChange}>With breed</Checkbox>
            </Box>
        </Grid>
    );
}

export default ImagesFilter;