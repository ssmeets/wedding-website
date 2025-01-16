import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import React from 'react'
import { Item } from '..'

export default function RsvpListBox(
    { setFunction, value, items, context }
        :
        { setFunction: (value: Item[]) => void, value: Item[], items: Item[], context: 'en' | 'nl' | 'pt' }) {
    return (
        <Listbox value={value} onChange={setFunction} multiple>
            <ListboxButton>{items[0][context]}</ListboxButton>
            <ListboxOptions anchor="bottom">
                {items.map((item) => (
                    <ListboxOption key={item.id} value={item} className="data-[focus]:bg-blue-900">
                        {item[context]}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    )
}
