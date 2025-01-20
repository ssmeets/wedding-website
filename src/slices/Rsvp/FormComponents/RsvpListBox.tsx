import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import React from 'react'
import { Item, Locales } from '..'
import { IoChevronDown } from 'react-icons/io5';
import { IoMdCheckboxOutline, IoIosSquareOutline } from "react-icons/io";
import { FaRegSquare } from "react-icons/fa6";


export default function RsvpListBox(
    { setFunction, value, items, context }
        :
        { setFunction: (value: (Item & Locales)[]) => void, value: (Item & Locales)[], items: (Item & Locales)[], context: 'en' | 'nl' | 'pt' }) {

    const getCheckBox = (item: (Item & Locales), items: (Item & Locales)[]) => {
        return (
            (items.includes(item)) ? <IoMdCheckboxOutline className='inline' /> : <IoIosSquareOutline className='inline' />
        )
    }

    return (
        <Listbox value={value} onChange={setFunction} multiple key={items.join("-")}>
            <ListboxButton className="bg-gray-200 md:bg-black text-black md:text-white text-xl md:text-2xl p-1 m-1 pl-3 uppercase tracking-widest">{value.length} events <IoChevronDown className="inline" /></ListboxButton>
            <ListboxOptions anchor="bottom">
                {items.map((item) => (
                    <ListboxOption key={item.id} value={item} className="bg-gray-100 md:bg-black text-black md:text-white text-2xl p-3 uppercase tracking-widest cursor-pointer">
                        {getCheckBox(item, value)} {item[context]}
                    </ListboxOption>
                ))}
            </ListboxOptions>
        </Listbox>
    )
}
