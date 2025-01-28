"use client";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useRef, useState } from "react";
import { GiCircle, GiPlainCircle } from "react-icons/gi";
import { gsap } from "gsap";
import clsx from "clsx";
import { Button } from "@headlessui/react";

export type Locales = {
  en: string;
  nl: string;
  pt: string;
};

const submit: Locales = {
  en: "View on map",
  nl: "Bekijk op de kaart",
  pt: "Ver no mapa",
};

/**
 * Props for `Party`.
 */
export type PartyProps = SliceComponentProps<Content.PartySlice>;

/**
 * Component for "Party" Slices.
 */
const Party = ({ slice, context }: PartyProps): JSX.Element => {
  const [open, setOpen] = useState<number>(1);
  const oneRef = useRef<HTMLDivElement>(null);
  const twoRef = useRef<HTMLDivElement>(null);
  const refs = [oneRef, twoRef];

  const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
  tl.add("start");
  if (open == 1) {
    tl.fromTo(twoRef.current, { opacity: 1 }, { opacity: 0, duration: 0, display: "none" });
    tl.fromTo(oneRef.current, { opacity: 0 }, { opacity: 1, duration: 1, display: "grid" });
  } else if (open == 2) {
    tl.fromTo(oneRef.current, { opacity: 1 }, { opacity: 0, duration: 0, display: "none" });
    tl.fromTo(twoRef.current, { opacity: 0 }, { opacity: 1, duration: 1, display: "grid" });
  }

  return (
    <section id="party" className="min-h-screen" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
      <Bounded>
        <h1 className="text-center font-curly text-8xl md:text-9xl">Schedule</h1>
        <div className="border-[1px] border-black font-content  w-full">
          <div className="p-10">
            {slice.primary.events.map((item, index) => (
              <div className={clsx("grid grid-cols-1 md:grid-cols-4 gap-4", index % 2 == 0 ? "opacity-1" : "opacity-0 hidden")} ref={refs[index]} key={index}>
                <div className="md:col-span-3 md:row-start-1">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-1 md:w-[150px]">
                      <PrismicNextImage field={item.image} />
                    </div>
                    <div className="md:col-span-2">
                      <h2 className="text-3xl md:text-4xl pb-4">{item.event_title}</h2>
                      <PrismicRichText field={item.description} />
                    </div>
                  </div>
                </div>
                <div className="md:row-start-1">
                  <h4 className="uppercase">{item.location}</h4>
                  <div className="text-xs">{item.event_day}</div>
                  <div className="text-xs">{item.event_date}</div>
                  <div className="text-xs">{item.event_time}</div>
                  <Button
                    onClick={() => window.open("https://www.google.com/maps/place/" + item.map.latitude + "," + item.map.longitude, "_blank")}
                    className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-neutral-700 md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700"
                  >
                    {submit[context as "en" | "nl" | "pt"]}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="font-content w-full">
          <ul className="block align-middle items-center w-full">
            {slice.primary.events.map((item, index) => (
              <>
                <li className={clsx("inline-block relative align-middle items-center text-center cursor-pointer", "w-1/" + slice.primary.events.length)} onClick={() => setOpen(index + 1)}>
                  {open == index + 1 ? <GiPlainCircle className="relative m-auto block -top-[9px] cursor-pointer" /> : <GiCircle className="relative m-auto block -top-[9px] bg-white" />}
                  <h3 className="text-2xl">{item.event_title}</h3>
                  <div>{item.event_day}</div>
                  <div>{item.event_date}</div>
                  <div>{item.event_time}</div>
                </li>
              </>
            ))}
          </ul>
        </div>
      </Bounded>
    </section>
  );
};

export default Party;
