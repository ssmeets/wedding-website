"use client";
import { Content } from "@prismicio/client";
import React from "react";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import clsx from "clsx";
import { LanguageLocale, LanguageSwitcher, LanguageSwitcherProps } from "./LanguageSwitcher";

type NavBarProps = {
  menu: Content.MenuDocument;
  locales: LanguageSwitcherProps;
  currentLang?: string | string[] | undefined;
};

export default function NavBar({ menu, locales, currentLang }: NavBarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="md-:py1 px-4 py-1 md:px-6 md:w-full bg-white md:bg-opacity-30 md:backdrop-filter md:backdrop-blur-lg text-black md:border-b md:border-gray-200 md:z-10" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-neutral-700 md:flex-row md:items-center">
        <LanguageSwitcher locales={locales} currentLang={currentLang} className="md:hidden" />
        <button type="button" className="fixed right-4 top-4 mb-4 p-2 text-3xl grid justify-items-end text-neutral-700 md:hidden" aria-expanded={open} onClick={() => setOpen(true)}>
          <MdMenu></MdMenu>
          <span className="sr-only">Open Menu</span>
        </button>
        <div
          className={clsx(
            "ga-4 fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end bg-opacity-30 backdrop-filter backdrop-blur-lg text-black border-b border-gray-200 pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]"
          )}
        >
          <button type="button" className="fixed right-4 top-4 mb-4 p-2 text-3xl grid justify-items-end gap-8 text-neutral-700 md:hidden" aria-expanded={open} onClick={() => setOpen(false)}>
            <MdClose />
            <span className="sr-only">Close menu</span>
            <div className="grid justify-items-end gap-4">
              {menu.data.navigation.map((item) => {
                return (
                  <a className="font-menu uppercase text-lg" href={"#" + item.link} key={item.link}>
                    {item.label}
                  </a>
                );
              })}
            </div>
          </button>
        </div>
      </div>
      <div className="hidden md:flex flex-row justify-between">
        <div className="flex-auto items-center">
          <ul className="m-auto items-center justify-center hidden md:flex direction-row flex-wrap">
            {menu.data.navigation.map((item) => (
              <li className="font-menu uppercase inline-block pt-4 pb-4 pl-10 pr-10 items-center text-center" key={item.link}>
                <a href={"#" + item.link}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <LanguageSwitcher locales={locales} currentLang={currentLang} className="mr-9 flex-none" />
      </div>
    </nav>
  );
}
