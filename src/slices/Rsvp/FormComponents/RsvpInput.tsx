import { Input } from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { guestPlaceholder } from "../translation";

export default function RsvpInput({ setFunction, value, placeholder, ...restProps }: { setFunction: (value: string) => void; value: string; placeholder: string }) {
  const checkPlaceholder = (val: string): boolean => {
    let ret = false;
    for (const key in guestPlaceholder) {
      if (val.startsWith(guestPlaceholder[key as keyof typeof guestPlaceholder])) {
        ret = true;
      }
    }
    return ret;
  };

  return (
    <Input
      className={clsx("inline w-72 mt-3 border-b-[1px] border-gray-950 bg-white/5 md:py-1.5 px-3 text-neutral-700", "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25")}
      type="text"
      name={placeholder}
      onChange={(e) => setFunction(e.target.value)}
      value={checkPlaceholder(value) ? "" : value}
      {...restProps}
      placeholder={placeholder}
    />
  );
}
