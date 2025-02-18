import { Input, Select, Textarea } from "@headlessui/react";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { InstructionsProps } from "./Instructions";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";



import { RefObject } from "react";
import axios from "axios";

export interface PostRegistryData {
    email: string;
    name: string;
    pdf: string
}

export default function GiftCard({ slice, item, isInstructionOpen, instructionRef, giftRef }: InstructionsProps & { instructionRef: RefObject<HTMLDivElement>; giftRef: RefObject<HTMLDivElement> }) {
    const currencies = ["R$", , "£", "€", "$"];
    const [isGiftCardOpen, setIsGiftCardOpen] = useState(false);
    const [name, setName] = useState("");
    const [amount, setAmount] = useState("");
    const [email, setEmail] = useState("");
    const [personalMessage, setPersonalMessage] = useState("");
    const [currency, setCurrency] = useState(currencies[0]);
    const [fontSize, setFontSize] = useState("1.25rem");
    const [lineHeight, setLineHeight] = useState("1.75rem");
    const [small, setSmall] = useState(false);
    const [scale, setScale] = useState(1);
    const [left, setLeft] = useState(0);
    const [top, setTop] = useState(0);
    const [sending, setSending] = useState(false);

    const pdfRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const paragraphRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const paragraph = paragraphRef.current;
        const maxHeight = 188;
        const maxSmallHeight = 161;

        if (paragraph && paragraph.clientHeight < maxSmallHeight && small) {
            setFontSize("1.25rem");
            setLineHeight("1.25rem");
            setSmall(false);
        } else if ((paragraph && paragraph.clientHeight > maxHeight) || small) {
            setFontSize("1rem");
            setLineHeight("1rem");
            setSmall(true);
        } else {
            setFontSize("1.25rem");
            setLineHeight("1.25rem");
        }
    }, [personalMessage]);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });
        if (isGiftCardOpen) {
            tl.fromTo(previewRef.current, { top: -1000, opacity: 0 }, { top: 50, opacity: 1, duration: 1 });
        } else {
            tl.fromTo(previewRef.current, { top: 0 }, { top: -1000, opacity: 0, duration: 1 });
        }
    }, [isGiftCardOpen]);

    const base64ToBlob = (base64: any, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(base64);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);

            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: contentType });
    };

    const downloadBase64File = (base64Data: any, fileName: string, contentType: string) => {
        const blob = base64ToBlob(base64Data, contentType);
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };


    const generatePDF = async () => {
        if (validateEmail(email)) {
            setSending(true);
            postGiftCard();
            const content = pdfRef.current;
            var opt = {
                margin: 0,
                filename: "myfile.pdf",
                image: { type: "jpeg", quality: 1 },
                html2canvas: { scale: 4, useCORS: true },
                jsPDF: { unit: "cm", format: "a5", orientation: "landscape" },
            };

            try {
                // Dynamically import html2pdf.js
                const html2pdf = (await import("html2pdf.js")).default;
                //html2pdf().set(opt).from(content).save();
                const pdfBinary = await html2pdf().set(opt).from(content).output('arraybuffer');

                // Convert binary data to Base64
                const pdfBase64 = btoa(
                    new Uint8Array(pdfBinary)
                        .reduce((data, byte) => data + String.fromCharCode(byte), '')
                );

                console.log("Generated base64:", pdfBase64);
                //                downloadBase64File(pdf, "test.pdf", "application/pdf");

                const res = await sendEmail(pdfBase64)
            } catch (error) {
                console.error("Failed to generate PDF:", error);
            }

        } else {
            alert("Invalid email")
        }
    };

    const postGiftCard = async () => {

        const config = {
            headers: {
                Authorization: "Token 8Vr4Ezetrc7ulVHoDaRT6SnjzTBwpc8M",
            },
        };

        const data = {
            "name": name,
            "gift": slice.primary.gift_card_title,
            "amount": amount,
            "email": email,
            "currency": currency,
            "date": new Date().toISOString()
        };
        axios
            .post(`https://api.baserow.io/api/database/rows/table/450851/?user_field_names=true`, data, config)
            .then(function (response) {
                // handle success
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });

    }

    const sendEmail = async (pdf: string) => {

        let data: PostRegistryData = {
            email: email,
            name: name,
            pdf: pdf
        };

        //console.log(data);

        axios
            .post(`/api/registry`, data)
            .then(function (response) {
                // handle success
                setSending(false);
                alert("Email sent successfully")
            })
            .catch(function (error) {
                // handle error
            })
            .finally(function () {
                // always executed
            });

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
        if (instructionRef.current && giftRef.current && pdfRef.current && previewRef.current) {
            const instructionRect = instructionRef.current.getBoundingClientRect();
            const giftRect = giftRef.current.getBoundingClientRect();
            const contentRect = pdfRef.current.getBoundingClientRect();
            const s = Math.floor((giftRect.height / contentRect.height) * 10) / 10;
            setScale(s);
            setLeft((previewRef.current.getBoundingClientRect().width - pdfRef.current.getBoundingClientRect().width * s) / 2);
            setTop(giftRect.height - pdfRef.current.getBoundingClientRect().height * s);
        }
        setIsGiftCardOpen(open);
    };

    const setAndCheckPersonalMessage = (message: string) => {
        const max_lines = 8;
        const max_chars = 250;
        if (message.split("\n").length > max_lines) {
            alert(`Maximum number of ${max_lines} lines reached`);
            return personalMessage
        }
        if (message.length > max_chars) {
            alert(`Maximum number of ${max_chars} characters reached`);
            return personalMessage
        }
        setPersonalMessage(message);
    }

    const getPDFPreview = () => {
        return (
            <>
                <div className="flex flex-col items-center justify-center w-full pl-6 pr-6">
                    <p className="font-curly text-8xl">{slice.primary.gift_card_title}</p>
                    <div className="max-h-48 min-h-48 overflow-wrap break-words overflow-hidden">
                        <p className="font-content pt-12 text-base whitespace-pre-line break-all" ref={paragraphRef} style={{ fontSize: fontSize, lineHeight: lineHeight }}>
                            {personalMessage}
                        </p>
                    </div>
                    <p className="font-content text-2xl font-bold self-end text-right pb-6">- {name}</p>
                    <div className="border-t-2 border-black h-2 pt-6 w-full"></div>
                    <div className="flex items-end justify-between w-full pt-6">
                        <p className="font-content text-2xl self-end">
                            {currency} {amount}
                        </p>
                        <img src={item.image.url ?? ""} alt="" className="max-h-24 w-auto object-contain ml-auto" />
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            <div>
                <div className="flex pt-4 cursor-pointer" onClick={() => setGiftCardOpen(!isGiftCardOpen)}>
                    <h3 className=" text-black font-semibold font-menu">{slice.primary.gift_card_title}</h3>
                    <FiChevronDown className={`text-xl pl-1 pr-1 fill-white/60 transform duration-1000 ease-in-out ${isGiftCardOpen ? "rotate-180" : ""}`} />
                </div>
                <div id="giftcard" className={`flex flex-col gap-4 overflow-hidden transition-[max-height] duration-500 ease-in-out ${isGiftCardOpen ? "max-h-[500px] scale-100 text-neutral-700 " : "max-h-0"}`}>
                    <Input
                        className={clsx("inline mt-3 border-b-[1px] border-gray-950 bg-white/5 md:py-1.5 px-3 text-neutral-700", "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25")}
                        type="text"
                        onChange={(e) => {
                            setName(e.target.value);
                        }}
                        value={name}
                        placeholder={slice.primary.name || ""}
                    />
                    <div className="flex flex-row">
                        <Select
                            onChange={(e) => {
                                setCurrency(e.target.value);
                            }}
                            className="bg-gray-100 md:bg-black text-neutral-700 md:text-white text-base md:text-lg p-1 m-1 pl-3 uppercase tracking-widest"
                        >
                            {currencies.map((item, index) => (
                                <option value={item} key={index}>
                                    {item}
                                </option>
                            ))}
                        </Select>
                        <Input
                            className={clsx("inline mt-3 border-b-[1px] flex-1 border-gray-950 bg-white/5 md:py-1.5 px-3 text-neutral-700", "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25")}
                            type="text"
                            onChange={(e) => {
                                setAmount(e.target.value);
                            }}
                            value={amount}
                            placeholder={slice.primary.amount || ""}
                        />
                    </div>
                    <Textarea
                        className={clsx("inline mt-3 border-b-[1px]  border-gray-950 bg-white/5 py-1.5 px-3 text-neutral-700", "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25")}
                        onChange={(e) => {
                            setAndCheckPersonalMessage(e.target.value);
                        }}
                        value={personalMessage}
                        placeholder={slice.primary.personal_message || ""}
                    />
                    <Input
                        className={clsx("inline mt-3 border-b-[1px] border-gray-950 bg-white/5 md:py-1.5 px-3 text-neutral-700", "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25")}
                        type="text"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        value={email}
                        placeholder={slice.primary.email || ""}
                    />
                    <button disabled={sending} onClick={() => generatePDF()} className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-neutral-700 md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700">
                        {sending ? "Sending..." : slice.primary.generate_gift_pdf}
                    </button>
                </div>
            </div>
            <div
                ref={previewRef}
                className="bg-gray-200 absolute w-full h-[500px] border-2 border-black"
                style={{
                    // width: pdfRef.current ? pdfRef.current.getBoundingClientRect().width : "auto",
                    height: giftRef.current ? giftRef.current.getBoundingClientRect().height + 24 : "auto",
                    top: -1000,
                    left: 0,
                    opacity: 0,
                }}
            >
                <div
                    className={`relative origin-top-left shadow-black shadow-3 border-black z-10`}
                    style={{
                        width: pdfRef.current ? pdfRef.current.getBoundingClientRect().width : "auto",
                        // height: pdfRef.current ? pdfRef.current.getBoundingClientRect().height : "auto",
                        left: left,
                        top: top,
                        transform: `scale(${scale})`,
                    }}
                >
                    <div
                        style={{
                            // width: pdfRef.current ? pdfRef.current.getBoundingClientRect().height * 1.42 : "auto",
                            height: pdfRef.current ? pdfRef.current.getBoundingClientRect().height : "auto",
                        }}
                        className="bg-white"
                    >
                        <div>{getPDFPreview()}</div>
                    </div>
                </div>
            </div>
            <div className="absolute invisible overflow-visible" style={{ width: giftRef.current ? giftRef.current.getBoundingClientRect().width : "auto" }}>
                <div style={{ width: pdfRef.current ? pdfRef.current.getBoundingClientRect().height * 1.42 : "auto", height: pdfRef.current ? pdfRef.current.getBoundingClientRect().height : "auto" }}>
                    <div ref={pdfRef}>{getPDFPreview()}</div>
                </div>
            </div>
        </>
    );
}
