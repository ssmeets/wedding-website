import React, { useRef, useState } from 'react'
import { RegistryProps } from '.';
import { FiChevronDown } from 'react-icons/fi';
import { Simplify } from '../../../prismicio-types';
import { Content } from '@prismicio/client';
import clsx from 'clsx';
import { PrismicRichText, SliceComponentProps } from '@prismicio/react';

export type InstructionsProps = SliceComponentProps<Content.RegistrySlice> & {
    item: Content.RegistrySliceDefaultPrimaryGiftsItem;
    setIsInstructionOpen: (value: boolean) => void;
    isInstructionOpen: boolean;
    ref?: React.Ref<HTMLDivElement>;
    instructionRef?: React.Ref<HTMLDivElement>;
    giftRef?: React.Ref<HTMLDivElement>;
};

export default function Instructions({ slice, item, setIsInstructionOpen, isInstructionOpen, ref }: InstructionsProps) {

    const [instruction, setInstruction] = useState<"br" | "us" | "nl" | "cash">("br");



    return (
        <div ref={ref}>
            <div id="instructions-header" className="flex pt-4 cursor-pointer" onClick={() => setIsInstructionOpen(!isInstructionOpen)}>
                <h3 className="text-black font-semibold font-menu">{slice.primary.instruction_title}</h3>
                <FiChevronDown className={`text-xl pl-1 pr-1 fill-white/60 transform duration-1000 ease-in-out ${isInstructionOpen ? "rotate-180" : ""}`} />
            </div>
            <div id="instructions" className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${isInstructionOpen ? "max-h-[500px] scale-100 text-neutral-700 opacity-100" : "max-h-0"}`}>
                <div className="flex gap-4">
                    {item.cash_instructions_title &&
                        (<div className={clsx("cursor-pointer p-1", instruction === "cash" && "bg-black text-white")} onClick={() => setInstruction("nl")} >
                            {item.cash_instructions_title}
                        </div>)}
                    {item.brazilian_instructions_title &&
                        (<div className={clsx("cursor-pointer p-1", instruction === "br" && "bg-black text-white")} onClick={() => setInstruction("br")}>
                            {item.brazilian_instructions_title}
                        </div>
                        )}
                    {item.us_instructions_title &&
                        (<div className={clsx("cursor-pointer p-1", instruction === "us" && "bg-black text-white")} onClick={() => setInstruction("us")}>
                            {item.us_instructions_title}
                        </div>
                        )}
                    {item.dutch_instructions_title &&
                        (<div className={clsx("cursor-pointer p-1", instruction === "nl" && "bg-black text-white")} onClick={() => setInstruction("nl")} >
                            {item.dutch_instructions_title}
                        </div>)}
                </div>
                <div className="border-[1px] border-gray-400">
                    <div className="p-4">
                        {instruction === "br" && <><PrismicRichText field={item.brazilian_instructions} /></>}
                        {instruction === "us" && <><PrismicRichText field={item.us_instructions} /></>}
                        {instruction === "nl" && <><PrismicRichText field={item.dutch_instructions} /></>}
                        {instruction === "cash" && <><PrismicRichText field={item.cash_instructions} /></>}
                    </div>
                </div>
            </div>
        </div>
    )
}
