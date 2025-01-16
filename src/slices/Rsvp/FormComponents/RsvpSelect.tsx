import { Select } from '@headlessui/react'
import React from 'react'
import { Item } from '..'

export default function RsvpSelect(
    { setFunction, value, items, context }
        :
        { setFunction: (value: string) => void, value: string, items: Item[], context: 'en' | 'nl' | 'pt' }) {
    return (
        <Select onChange={(e) => setFunction(e.target.value)}>
            {items.map((item) => (
                <option value={item.name}>{item[context]}</option>
            ))}
        </Select>
    )
}
