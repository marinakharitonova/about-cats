import React, {useState} from "react";

/**
 * useSelect hook returns value and onChange method fo HTML select element.
 */
export const useSelect = <T extends string>(initialValue: T): [T, (e: React.ChangeEvent<HTMLSelectElement>) => void, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value as T
        if (selectedValue === value) return

        setValue(selectedValue)
    }

    return [value, onChange, setValue]
}