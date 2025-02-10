import { Input, Select, Textarea } from '@headlessui/react';
import { Content } from '@prismicio/client';
import clsx from 'clsx';
import html2pdf from 'html2pdf.js';
import React, { useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi';
import { RegistryProps } from '.';
import { SliceComponentProps } from '@prismicio/react';
import { InstructionsProps } from './Instructions';
import { PrismicNextImage } from '@prismicio/next';



import { RefObject } from 'react';

export default function GiftCard({ slice, item, isInstructionOpen, instructionRef, giftRef }: InstructionsProps & { instructionRef: RefObject<HTMLDivElement>, giftRef: RefObject<HTMLDivElement> }) {
    const currencies = ["R$", , "£", "€", "$"];
    const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [personalMessage, setPersonalMessage] = useState("");
    const [currency, setCurrency] = useState(currencies[0]);
    const [fontSize, setFontSize] = useState('1.25rem');
    const [lineHeight, setLineHeight] = useState('1.75rem');
    const [small, setSmall] = useState(false);

    const contentRef = useRef(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const paragraph = paragraphRef.current;
        const maxHeight = 188;
        const maxSmallHeight = 161;

        if ((paragraph && paragraph.clientHeight < maxSmallHeight) && small) {
            setFontSize('1.25rem');
            setLineHeight('1.25rem');
            setSmall(false);
        } else if ((paragraph && paragraph.clientHeight > maxHeight) || small) {
            setFontSize('1rem');
            setLineHeight('1rem');
            setSmall(true);
        }
        else {
            setFontSize('1.25rem');
            setLineHeight('1.25rem');

        }

    }, [personalMessage]);

    const generatePDF = async () => {
        // if (validateEmail(email)) {
        const content = contentRef.current;
        var opt = {
            margin: 0,
            filename: 'myfile.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'cm', format: 'a5', orientation: 'landscape' }
        };
        html2pdf().set(opt).from(content).save();
        // } else {
        //     alert("Invalid email")
        // }
    }

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const setGiftCardOpen = (open: boolean) => {
        if (open && isInstructionOpen) {
            const instructionsHeader = document.getElementById("instructions-header");
            if (instructionsHeader) {
                instructionsHeader.click();
            }
        }
        if (giftRef.current) {
            console.log("giftref", giftRef.current.getBoundingClientRect());
        }
        if (instructionRef.current) {
            console.log("instructionRef", instructionRef.current.getBoundingClientRect());
        }
        setIsGiftCardOpen(open);
    }

    return (
        <>
            <div>
                <div className="flex pt-4 cursor-pointer" onClick={() => setGiftCardOpen(!isGiftCardOpen)} >
                    <h3 className=" text-black font-semibold font-menu">{slice.primary.gift_card_title}</h3>
                    <FiChevronDown className={`text-xl pl-1 pr-1 fill-white/60 transform duration-1000 ease-in-out ${isGiftCardOpen ? "rotate-180" : ""}`} />
                </div>
                <div id="giftcard" className={`flex flex-col gap-4 overflow-hidden transition-[max-height] duration-500 ease-in-out ${isGiftCardOpen ? "max-h-[500px] scale-100 text-neutral-700 " : "max-h-0"}`}>
                    <Input
                        className={clsx("inline mt-3 border-b-[1px] border-gray-950 bg-white/5 md:py-1.5 px-3 text-neutral-700", "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25")}
                        type="text"
                        onChange={(e) => { setName(e.target.value) }}
                        value={name}
                        placeholder={slice.primary.name || ""}
                    />
                    <div className="flex flex-row">
                        <Select
                            onChange={(e) => { setCurrency(e.target.value) }}
                            className="bg-gray-100 md:bg-black text-neutral-700 md:text-white text-base md:text-lg p-1 m-1 pl-3 uppercase tracking-widest">
                            {currencies.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </Select>
                        <Input
                            className={clsx("inline mt-3 border-b-[1px] flex-1 border-gray-950 bg-white/5 md:py-1.5 px-3 text-neutral-700", "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25")}
                            type="text"
                            onChange={(e) => { setAmount(e.target.value) }}
                            value={amount}
                            placeholder={slice.primary.amount || ""}
                        />
                    </div>
                    <Input
                        className={clsx("inline mt-3 border-b-[1px] border-gray-950 bg-white/5 md:py-1.5 px-3 text-neutral-700", "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25")}
                        type="text"
                        onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                        placeholder={slice.primary.email || ""}
                    />
                    <Textarea
                        className={clsx("inline mt-3 border-b-[1px]  border-gray-950 bg-white/5 py-1.5 px-3 text-neutral-700", "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25")}
                        onChange={(e) => { setPersonalMessage(e.target.value) }}
                        value={personalMessage}
                        placeholder={slice.primary.personal_message || ""}
                    />
                    <button onClick={() => generatePDF()} className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-neutral-700 md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700">
                        {slice.primary.generate_gift_pdf}
                    </button>
                </div>
            </div>
            <div className="">
                <div ref={contentRef}>
                    <div className="flex flex-col items-center justify-center w-full pl-9 pr-9 absolute" style={{ top: 55 }}>
                        <p className="font-curly text-8xl">{slice.primary.gift_card_title}</p>
                        <div className="max-h-48 min-h-48 overflow-hidden">
                            <p className="font-content pt-12 text-base whitespace-pre-line" ref={paragraphRef} style={{ fontSize: fontSize, lineHeight: lineHeight }}>
                                {personalMessage}
                            </p>
                        </div>
                        <p className="font-content text-2xl font-bold self-end text-right pb-6">- {name}</p>
                        <div className="border-t-2 border-black h-2 pt-6 w-full"></div>
                        <div className="flex items-end justify-between w-full pt-6">
                            <p className="font-content text-2xl self-end">{currency} {amount}</p>
                            <PrismicNextImage className="max-h-24 w-auto object-contain ml-auto" field={item.image} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
