"use client";
import { Content } from "@prismicio/client";
import React from "react";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";
import clsx from "clsx";
import { LanguageLocale, LanguageSwitcher, LanguageSwitcherProps } from "./LanguageSwitcher";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

type NavBarProps = {
  menu: Content.MenuDocument;
  locales: LanguageSwitcherProps;
  currentLang?: string | string[] | undefined;
};

const getGroupedNavigation = (menu: Content.MenuDocument, group: string, i: number) => {
  return (
    <Menu key={`menu-${i}`}>
      <MenuButton className="flex font-menu uppercase text-sm pt-4 pb-4 pl-3 pr-3 lg:text-base lg:pl-5 lg:pr-5 2xl:pl-8 2xl:pr-8 items-center text-center">
        {group}
        <FiChevronDown className="size-4 fill-white/60" />
      </MenuButton>
      <MenuItems
        modal={false}
        transition
        anchor="bottom end"
        className="w-56 z-50 origin-top-right text-sm/6 border-gray-950  bg-white transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 md:bg-opacity-30 md:backdrop-filter md:backdrop-blur-lg"
      >
        {menu.data.navigation
          .filter((item) => item.group === group)
          .map((item) => (
            <MenuItem key={item.label}>
              <div className="w-full hover:bg-gray-100 cursor-pointer">
                <a className="font-menu uppercase inline-block text-sm pt-4 pb-4 pl-3 pr-3 lg:text-base lg:pl-5 lg:pr-5 2xl:pl-8 2xl:pr-8 items-center text-center" href={"#" + item.link} key={item.link}>
                  {item.label}
                </a>
              </div>
            </MenuItem>
          ))}
      </MenuItems>
    </Menu>
  );
};

export default function NavBar({ menu, locales, currentLang }: NavBarProps) {
  const [open, setOpen] = useState(false);
  let groups: string[] = [];

  return (
    <nav className="md-:py1 px-2 py-1 md:px-2 md:w-full bg-white md:bg-opacity-30 md:backdrop-filter md:backdrop-blur-lg text-black md:border-b md:border-gray-200 md:z-10" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-black md:flex-row md:items-center">
        <LanguageSwitcher locales={locales} currentLang={currentLang} className="md:hidden" />
        <button type="button" className="fixed right-4 top-4 mb-4 p-2 text-3xl grid justify-items-end text-black md:hidden" aria-expanded={open} onClick={() => setOpen(true)}>
          <MdMenu></MdMenu>
          <span className="sr-only">Open Menu</span>
        </button>
        <div
          className={clsx(
            "ga-4 fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end bg-opacity-30 backdrop-filter backdrop-blur-lg text-black border-b border-gray-200 pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]"
          )}
        >
          <button type="button" className="fixed right-4 top-4 mb-4 p-2 text-3xl grid justify-items-end gap-8 text-black md:hidden" aria-expanded={open} onClick={() => setOpen(false)}>
            <MdClose />
            <span className="sr-only">Close menu</span>
            <div className="grid justify-items-end gap-4">
              {menu.data.navigation.map((item) => {
                return (
                  <a className="font-menu uppercase text-lg [text-shadow:_2px_2px_4px_rgba(255,255,255,0.8)]" href={"#" + item.link} key={item.link}>
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
            {menu.data.navigation.map((item, i) => {
              if (item.group === "" || item.group === undefined || item.group === null) {
                return (
                  <li className="font-menu uppercase inline-block text-sm pt-4 pb-4 pl-3 pr-3 lg:text-base lg:pl-5 lg:pr-5 2xl:pl-8 2xl:pr-8 items-center text-center" key={item.link}>
                    <a href={"#" + item.link}>{item.label}</a>
                  </li>
                );
              } else if (!groups.includes(item.group)) {
                {
                  groups.push(item.group);
                  return getGroupedNavigation(menu, item.group ?? "", i);
                }
              }
            })}
          </ul>
        </div>
        <LanguageSwitcher locales={locales} currentLang={currentLang} className="mr-1 flex-none" />
      </div>
    </nav>
  );
}
