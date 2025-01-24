import React, { useState } from 'react'
import RsvpInput from './FormComponents/RsvpInput'
import RsvpSelect from './FormComponents/RsvpSelect'
import RsvpTextArea from './FormComponents/RsvpTextArea'
import RsvpListBox from './FormComponents/RsvpListBox'
import { allergies, comings, dietaryPlaceholder, emailPlaceholder, events, foods, guestPlaceholder, Item, Locales, namePlaceholder, parties, songNamePlaceholder } from './translation'
import { Content, RichTextField } from '@prismicio/client'
import { useGuestStore } from './guestStore'
import GuestManagement from './GuestManagement'

//export default async function Header({ locales, currentLang }: { locales: LanguageSwitcherProps, currentLang?: string | string[] | undefined }) {

export default function Guests({ context, slice }: { context: string, slice: Content.RsvpSlice }) {

    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [song, setSong] = useState("")
    const [party, setParty] = useState("alone")
    const [coming, setComing] = useState("attending")
    const [allergy, setAllergy] = useState("noallergy")
    const [food, setFood] = useState("chicken")
    const [dietary, setDietary] = useState("")

    const [selectedEvent, setSelectedEvent] = useState<(Item & Locales)[]>([])

    const { guests } = useGuestStore();





    return (
        <>
            <div className="block text-center font-content text-xl md:text-2xl leading-10">
                {guests.map((guest, index) => (
                    <>
                        <div className='bg-slate-100 p-2'>{guest.name || guestPlaceholder[context as 'en' | 'nl' | 'pt']}</div>
                        <div>
                            <GuestManagement key={index} guest={guest} context={context} slice={slice} />
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}
