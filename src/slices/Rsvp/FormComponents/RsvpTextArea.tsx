import { Textarea } from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";

export default function RsvpTextArea({ setFunction, value, placeholder, ...restProps }: { setFunction: (value: string) => void; value: string; placeholder: string }) {
  return (
    <Textarea
      className={clsx("inline w-96 mt-3 border-b-[1px]  border-gray-950 bg-white/5 py-1.5 px-3 text-neutral-700", "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25")}
      name={placeholder}
      onChange={(e) => setFunction(e.target.value)}
      value={value}
      {...restProps}
      placeholder={placeholder}
    />
  );
}
