import React, { useRef, useState } from "react";
import { RegistryProps } from ".";
import { FiChevronDown } from "react-icons/fi";
import { Simplify } from "../../../prismicio-types";
import { Content } from "@prismicio/client";
import clsx from "clsx";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";

export type InstructionsProps = SliceComponentProps<Content.RegistrySlice> & {
  item: Content.RegistrySliceDefaultPrimaryGiftsItem;
  setIsInstructionOpen: (value: boolean) => void;
  isInstructionOpen: boolean;
  ref?: React.Ref<HTMLDivElement>;
  instructionRef?: React.Ref<HTMLDivElement>;
  giftRef?: React.Ref<HTMLDivElement>;
  setGOpen?: (value: boolean) => void;
  setGiftInfoOpen?: (value: boolean) => void;
};

export default function Instructions({ slice, item, setIsInstructionOpen, isInstructionOpen, ref, setGOpen, setGiftInfoOpen }: InstructionsProps) {
  const [instruction, setInstruction] = useState<"br" | "us" | "nl" | "uk" | "cash">("nl");

  const setOpen = () => {
    setGOpen && setGOpen(!isInstructionOpen);
    setIsInstructionOpen(!isInstructionOpen);
    setGiftInfoOpen && setGiftInfoOpen(isInstructionOpen);
  };

  return (
    <div ref={ref}>
      <div id="instructions-header" className="flex pt-4 cursor-pointer" onClick={() => setOpen()}>
        <h3 className="text-black font-semibold font-menu">{slice.primary.instruction_title}</h3>
        <FiChevronDown className={`text-xl pl-1 pr-1 fill-white/60 transform duration-1000 ease-in-out ${isInstructionOpen ? "rotate-180" : ""}`} />
      </div>
      <div id="instructions" className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isInstructionOpen ? "max-h-[500px] scale-100 text-neutral-700 opacity-100" : "max-h-0"}`}>
        <div className="text-sm sm:text-base">{slice.primary.instructions_description}</div>
        <br />
        <div className="flex gap-4">
          {slice.primary.dutch_instructions_title && (
            <div className={clsx("cursor-pointer p-1 text-sm sm:text-base", instruction === "nl" && "bg-black text-white")} onClick={() => setInstruction("nl")}>
              {slice.primary.dutch_instructions_title}
            </div>
          )}
          {slice.primary.brazilian_instructions_title && (
            <div className={clsx("cursor-pointer p-1 text-sm sm:text-base", instruction === "br" && "bg-black text-white")} onClick={() => setInstruction("br")}>
              {slice.primary.brazilian_instructions_title}
            </div>
          )}
          {slice.primary.us_instructions_title && (
            <div className={clsx("cursor-pointer p-1 text-sm sm:text-base", instruction === "us" && "bg-black text-white")} onClick={() => setInstruction("us")}>
              {slice.primary.us_instructions_title}
            </div>
          )}
          {slice.primary.uk_instructions_title && (
            <div className={clsx("cursor-pointer p-1 text-sm sm:text-base", instruction === "uk" && "bg-black text-white")} onClick={() => setInstruction("uk")}>
              {slice.primary.uk_instructions_title}
            </div>
          )}
          {slice.primary.cash_instructions_title && (
            <div className={clsx("cursor-pointer p-1 text-sm sm:text-base", instruction === "cash" && "bg-black text-white")} onClick={() => setInstruction("cash")}>
              {slice.primary.cash_instructions_title}
            </div>
          )}
        </div>
        <div className="border-[1px] border-gray-400">
          <div className="p-4 text-sm sm:text-base">
            {instruction === "nl" && (
              <>
                <PrismicRichText field={slice.primary.dutch_instructions} />
              </>
            )}
            {instruction === "br" && (
              <>
                <PrismicRichText field={slice.primary.brazilian_instructions} />
              </>
            )}
            {instruction === "us" && (
              <>
                <PrismicRichText field={slice.primary.us_instructions} />
              </>
            )}
            {instruction === "uk" && (
              <>
                <PrismicRichText field={slice.primary.uk_instructions} />
              </>
            )}
            {instruction === "cash" && (
              <>
                <PrismicRichText field={slice.primary.cash_instructions} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
