import React, {useState} from "react";


export const useSelect = (initialValue: string): [string, (e: React.ChangeEvent<HTMLSelectElement>) => void] => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value
        if (selectedValue === value) return

        setValue(selectedValue)
    }

    return [value, onChange]
}