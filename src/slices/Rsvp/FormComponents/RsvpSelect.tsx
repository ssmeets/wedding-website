import { Select } from "@headlessui/react";
import React from "react";
import { Item, Locales } from "../translation";

export default function RsvpSelect({ setFunction, value, items, context }: { setFunction: (value: string) => void; value: string; items: (Item & Locales)[]; context: "en" | "nl" | "pt" }) {
  return (
    <Select key={items.join("-")} onChange={(e) => setFunction(e.target.value)} className="bg-gray-100 md:bg-black text-neutral-700 md:text-white text-base md:text-lg p-1 m-1 pl-3 uppercase tracking-widest">
      {items.map((item) => (
        <option value={item.name}>{item[context]}</option>
      ))}
    </Select>
  );
}
