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
    'en': ['English', 'Hi! How are you?'],
    'nl': ['Nederlands', 'Hoi! Hoe gaat het?'],
    'pt': ['Português', 'Oi! Tudo Bem?'],
};

export const LanguageSwitcher = ({ locales, currentLang }: { locales: LanguageSwitcherProps, currentLang?: string | string[] | undefined }) => {


    return (
        <>
            <div className="pt-4 pr-4 z-50 w-auto text-right">
                <Menu>
                    <MenuButton className="font-sans inline-flex items-center gap-2 bg-white py-1.5 px-3 text-sm/6 text-black shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-00 data-[open]:bg-gray-200 data-[focus]:outline-1 data-[focus]:outline-white border-2 border-gray-950">
                        <IoLanguageSharp className="size-4" />
                        {localeLabels[currentLang as keyof typeof localeLabels][0]}
                        <IoChevronDownCircleOutline className="size-4 fill-white/60" />
                    </MenuButton>

                    <MenuItems
                        transition
                        anchor="bottom end"
                        className="w-56 origin-top-right text-sm/6  border-gray-950  bg-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        {Object.keys(localeLabels).filter((locale) => locale !== currentLang).map((locale) => {

                            return (
                                <MenuItem key={locale}>
                                    <PrismicNextLink
                                        href={"/" + locale}
                                        className="group text-left flex w-full items-center gap-2 py-1.5 px-3 data-[focus]:bg-white/10 border-b-2  border-gray-950">
                                        <kbd className="hidden font-sans text-xs text-black/50 group-data-[focus]:inline">{localeLabels[locale as keyof typeof localeLabels][1]}</kbd>
                                        {localeLabels[locale as keyof typeof localeLabels][0]}
                                    </PrismicNextLink>
                                </MenuItem>
                            )
                        })}
                    </MenuItems>
                </Menu>
            </div>
        </>
    )
}
