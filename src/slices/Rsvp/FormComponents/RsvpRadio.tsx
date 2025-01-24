import { Radio, RadioGroup } from '@headlessui/react'
import React from 'react'
import { IoIosCheckboxOutline } from "react-icons/io";
import { InvitationObject } from '../guestStore';


export default function RsvpRadio({ setFunction, value, items, context }
    :
    { setFunction: (value: InvitationObject) => void, value?: InvitationObject, items: InvitationObject[], context: 'en' | 'nl' | 'pt' }) {
    return (
        <RadioGroup value={value || items[0]} onChange={setFunction} aria-label="Invitations" className="space-y-2 w-fit m-auto">
            {items.map((item) => (
                <Radio
                    key={item.id}
                    value={item}
                    className="group relative flex cursor-pointer bg-white/5 py-4 px-5 text-black shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-black/10"
                >
                    <div className="flex w-full items-center text-center  justify-between gap-4">
                        <IoIosCheckboxOutline className="size-6 fill-black opacity-0 transition group-data-[checked]:opacity-100 pr-1" />
                        <p className="text-black">{item.Name}</p>
                    </div>
                </Radio>
            ))}
        </RadioGroup>
    )
}
