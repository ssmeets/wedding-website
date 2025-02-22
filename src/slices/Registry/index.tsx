"use client";
import Bounded from "@/components/Bounded";
import Modal from "@/components/Modal";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useRef, useState } from "react";
import Instructions from "./Instructions";
import GiftCard from "./GiftCard";
import clsx from "clsx";
import useHeaderRef from "@/components/useHeaderRef";

// const GiftCard = dynamic(() => import("./GiftCard"), {
//   ssr: false,
//   loading: () => <p>Loading...</p>,
// });
/**
 * Props for `Registry`.
 */
export type RegistryProps = SliceComponentProps<Content.RegistrySlice>;

/**
 * Component for "Registry" Slices.
 */
const Registry = ({ slice }: RegistryProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<number>(-1);
  const [isInstructionOpen, setIsInstructionOpen] = useState(false);
  const instructionsRef = useRef(null);
  const [giftCardOpen, setGiftCardOpen] = useState(false);
  const giftRef = useRef(null);

  const { headerRef } = useHeaderRef();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {

    const updateHeaderHeight = () => {
      if (headerRef.current) {
        console.log("Header height clut:", headerRef.current.offsetHeight);
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };

    // Update header height on mount
    updateHeaderHeight();

    // Optionally, update header height on window resize
    window.addEventListener('resize', updateHeaderHeight);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, [headerRef]);

  return (
    <section id="registry" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}
      style={{
        paddingTop: `${headerHeight}px`,
        marginTop: `-${headerHeight}px`
      }}
    >
      <Bounded>
        <h1 className="text-center font-curly text-8xl md:text-9xl">{slice.primary.title}</h1>
        <div className="text-balance leading-7 md:text-2xl font-content text-center">
          <PrismicRichText field={slice.primary.description} />
        </div>
        <div className="flex flex-row">
          {slice.primary.gifts.map((item, index) => {
            return (
              <div key={index} className="cursor-pointer relative basis-1/2 p-4 md:basis-1/3">
                <div className="relative h-80 w-full hover:border border-gray-200" onClick={() => setIsOpen(index)}>
                  <PrismicNextImage className="h-full w-full p-2 md:p-3 lg:p-6 object-contain" field={item.image} alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
                  <div className="absolute bottom-0 left-0 w-full p-4 text-black font-semibold">{item.gift_title}</div>
                </div>
                <Modal isOpen={isOpen === index} onClose={(value) => setIsOpen(value)}>
                  <div className={clsx("flex items-start gap-4 text-sm sm:text-base flex-col sm:flex-row", giftCardOpen && "max-h-24 overflow-hidden")} ref={giftRef}>
                    <div className="flex-1">
                      <h2 className="text-black font-semibold font-menu">{item.gift_title}</h2>
                      <PrismicRichText field={item.gift_description} />
                    </div>
                    <div className="w-1/3 sm:pt-8">
                      <PrismicNextImage field={item.image} className="h-10 w-auto sm:w-full sm:h-auto" alt="" />
                    </div>
                  </div>
                  <Instructions slice={slice} item={item} index={0} slices={[]} context={undefined} setIsInstructionOpen={setIsInstructionOpen} isInstructionOpen={isInstructionOpen} ref={instructionsRef} setGOpen={setGiftCardOpen} />
                  <GiftCard slice={slice} item={item} index={0} slices={[]} context={undefined} setIsInstructionOpen={setIsInstructionOpen} isInstructionOpen={isInstructionOpen} instructionRef={instructionsRef} giftRef={giftRef} setGOpen={setGiftCardOpen} />
                </Modal>
              </div>
            );
          })}
        </div>
      </Bounded>
    </section>
  );
};

export default Registry;
