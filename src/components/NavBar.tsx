"use client";

import { useState } from "react";
import { Content, asLink } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import WordMark from "./WordMark";
import ButtonLink from "./ButtonLink";
import { MdClose, MdMenu } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavBarProps = {
    settings: Content.SettingsDocument;
};

export default function NavBar({ settings }: NavBarProps) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    return (
        <nav className="md-:py6 px-4 py-4 md:px-6" aria-label="Main">
            <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
                <div className="flex items-center justify-between">

                    <Link href="/" className="z-50">
                        <WordMark />
                        <span className="sr-only">Home page</span>
                    </Link>

                    <button type="button" className="block p-2 text-3xl text-white md:hidden" aria-expanded={open}
                        onClick={() => setOpen(true)}
                    >
                        <MdMenu></MdMenu>
                        <span className="sr-only">Open Menu</span>
                    </button>

                </div>

                <div
                    className={clsx(
                        "ga-4 fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
                        open ? "translate-x-0" : "translate-x-[100%]",
                    )}
                >
                    <button
                        type="button"
                        className="fixed right-4 top-4 mb-4 block p-2 text-3xl text-white md:hidden"
                        aria-expanded={open}
                        onClick={() => setOpen(false)}
                    >
                        <MdClose />
                        <span className="sr-only">Close menu</span>
                    </button>

                    <div className="grid justify-items-end gap-8">
                        {settings.data.navigation.map((item) => {
                            if (item.cta_button) {
                                return (
                                    <ButtonLink
                                        key={item.label}
                                        field={item.link}
                                        onClick={() => setOpen(false)}
                                        aria-current={
                                            pathname.includes(asLink(item.link) as string)
                                                ? "page"
                                                : undefined
                                        }
                                    >
                                        {item.label}
                                    </ButtonLink>
                                );
                            }
                            return (
                                <PrismicNextLink
                                    key={item.label}
                                    className="block px-3 text-3xl first:mt-8"
                                    field={item.link}
                                    onClick={() => setOpen(false)}
                                    aria-current={
                                        pathname.includes(asLink(item.link) as string)
                                            ? "page"
                                            : undefined
                                    }
                                >
                                    {item.label}
                                </PrismicNextLink>
                            );
                        })}
                    </div>
                </div>

                <ul className="flex gap-6 hidden md:flex">
                    {settings.data.navigation.map((navItem) => {

                        if (navItem.cta_button) {
                            return (
                                <li key={navItem.label}>
                                    <ButtonLink field={navItem.link}>
                                        {navItem.label}
                                    </ButtonLink>
                                </li>
                            )
                        }
                        return (
                            <li key={navItem.label}>
                                <PrismicNextLink
                                    field={navItem.link}
                                    className="inline-flex min-h-11 items-center"
                                >
                                    {navItem.label}
                                </PrismicNextLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    );
}
