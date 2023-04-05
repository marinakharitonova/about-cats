import React, {useMemo} from 'react';
import {Box, Select, Text} from "@chakra-ui/react";

type ImagesSelectProps = {
    label: string
    value: string
    options: {
        id: string
        name: string
    }[]
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function ImagesSelect({label, value, onChange, options}: ImagesSelectProps) {
    const optionsElems = useMemo(() =>
        options.map(option => <option key={option.id} value={option.id}>{option.name}</option>), [options])
    return (
        <Box>
            <Text fontSize='md' mb={1}>{label}</Text>
            <Select value={value} onChange={onChange} placeholder={'None'}>
                {optionsElems}
            </Select>
        </Box>
    );
}

export default ImagesSelect;