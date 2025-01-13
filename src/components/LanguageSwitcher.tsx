"use client";
import { PrismicNextLink } from '@prismicio/next';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IoChevronDownCircleOutline, IoLanguageSharp } from 'react-icons/io5';


export type LanguageLocale = {
    lang: string;
    lang_name: string;
    url: string;
}

export interface LanguageSwitcherProps {
    locales: LanguageLocale[];
}

const localeLabels = {
    'en-us': ['English', 'Hi!'],
    'nl-nl': ['Nederlands', 'Hallo!'],
    'pt-br': ['Português', 'Oi!']
};

export const LanguageSwitcher = ({ locales, currentLang }: { locales: LanguageSwitcherProps, currentLang?: string }) => {


    return (
        <>
            <div className="fixed w-52 text-right">
                <Menu>
                    <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                        <IoLanguageSharp className="size-4 fill-white/60" />
                        {localeLabels[currentLang as keyof typeof localeLabels][0]}
                        <IoChevronDownCircleOutline className="size-4 fill-white/60" />
                    </MenuButton>

                    <MenuItems
                        transition
                        anchor="bottom end"
                        className="w-40 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        {Object.keys(localeLabels).filter((locale) => locale !== currentLang).map((locale) => {

                            return (
                                <MenuItem key={locale}>
                                    <PrismicNextLink
                                        href={"/" + locale}
                                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                                        {localeLabels[locale as keyof typeof localeLabels][0]}
                                        <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline">{localeLabels[locale as keyof typeof localeLabels][1]}</kbd>
                                    </PrismicNextLink>
                                </MenuItem>
                            )
                        })}
                    </MenuItems>
                </Menu>
            </div>
            <hr />
        </>
    )
}
