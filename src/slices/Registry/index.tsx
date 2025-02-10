"use client";
import Bounded from "@/components/Bounded";
import Modal from "@/components/Modal";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import html2pdf from "html2pdf.js";
import { useRef, useState } from "react";

/**
 * Props for `Registry`.
 */
export type RegistryProps = SliceComponentProps<Content.RegistrySlice>;

/**
 * Component for "Registry" Slices.
 */
const Registry = ({ slice }: RegistryProps): JSX.Element => {

  const [isOpen, setIsOpen] = useState(false);
  const [instruction, setInstruction] = useState<"br" | "us" | "nl">("br");

  const contentRef = useRef(null);

  const generatePDF = async () => {
    const content = contentRef.current;
    var opt = {
      margin: 1,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'cm', format: 'a5', orientation: 'landscape' }
    };
    html2pdf().set(opt).from(content).save();
  }


  return (
    <section
      id="registry"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <h1 className="text-center font-curly text-8xl md:text-9xl">{slice.primary.title}</h1>
        <div className="text-balance leading-7 md:text-2xl font-content text-center">
          <PrismicRichText field={slice.primary.description} />
        </div>
        {slice.primary.gifts.map((item) => (
          <>
            <div>
              <div>{item.gift_title}</div>
              <PrismicNextImage field={item.image} />

            </div>
            <div className="flex flex-col items-center justify-cente">
              <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Open Modal
              </button>

              <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">{item.gift_title}</h2>
                    <PrismicRichText field={item.gift_description} />
                  </div>
                  <div className="w-1/3">
                    <PrismicNextImage field={item.image} className="w-full h-auto" />
                  </div>
                </div>
                <div>
                  <div className="flex gap-4">
                    <div className="cursor-pointer" onClick={() => setInstruction("br")}>
                      {item.brazilian_instructions_title}
                    </div>
                    -
                    <div className="cursor-pointer" onClick={() => setInstruction("us")}>
                      {item.us_instructions_title}
                    </div>
                    -
                    <div className="cursor-pointer" onClick={() => setInstruction("nl")} >
                      {item.dutch_instructions_title}
                    </div>
                  </div>
                  <div>
                    {instruction == "br" && <><PrismicRichText field={item.brazilian_instructions} /></>}
                    {instruction == "us" && <><PrismicRichText field={item.us_instructions} /></>}
                    {instruction == "nl" && <><PrismicRichText field={item.dutch_instructions} /></>}
                  </div>
                  <div>
                    <div>
                      <div ref={contentRef}>
                        {/* Content to be converted to PDF */}
                        <h1 className="font-curly text-4xl">Hello, PDF!</h1>
                        <p className="font-content">This is some content for the PDF.</p>
                      </div>
                      <button onClick={() => generatePDF()}>Generate PDF</button>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </>
        ))}
      </Bounded>
    </section>
  );
};

export default Registry;
