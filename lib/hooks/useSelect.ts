import React, {useState} from "react";

/**
 * useSelect hook returns value and onChange method fo HTML select element.
 */
export const useSelect = (initialValue: string): [string, (e: React.ChangeEvent<HTMLSelectElement>) => void, typeof setValue] => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value
        if (selectedValue === value) return

        setValue(selectedValue)
    }

    return [value, onChange, setValue]
}