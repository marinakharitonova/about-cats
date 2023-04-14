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
    withPlaceholder?: boolean
}

/**
 * ImagesSelect wraps the native select by adding a label, a value, an onChange method, a placeholder, an options to it.
 */
function ImagesSelect({label, value, onChange, options, withPlaceholder = true}: ImagesSelectProps) {
    const optionsElems = useMemo(() =>
        options.map(option => <option key={option.id} value={option.id}>{option.name}</option>), [options])

    const placeholder = withPlaceholder ? {placeholder: 'None'} : {}
    return (
        <Box>
            <Text fontSize='md' mb={1}>{label}</Text>
            <Select value={value} onChange={onChange} {...placeholder}>
                {optionsElems}
            </Select>
        </Box>
    );
}

export default ImagesSelect;