import { Select } from '@headlessui/react'
import React from 'react'
import { Item, Locales } from '..'

export default function RsvpSelect(
    { setFunction, value, items, context }
        :
        { setFunction: (value: string) => void, value: string, items: (Item & Locales)[], context: 'en' | 'nl' | 'pt' }) {
    return (
        <Select key={items.join("-")} onChange={(e) => setFunction(e.target.value)} className="bg-black text-white text-2xl p-1 m-1 pl-3 uppercase tracking-widest">
            {items.map((item) => (
                <option value={item.name} >{item[context]}</option>
            ))}
        </Select>
    )
}
