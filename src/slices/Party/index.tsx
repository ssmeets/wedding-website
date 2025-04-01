"use client";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useRef, useState } from "react";
import { GiCircle, GiPlainCircle } from "react-icons/gi";
import { gsap } from "gsap";
import clsx from "clsx";
import { Button } from "@headlessui/react";
import useHeaderRef from "@/components/useHeaderRef";

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

  const { headerRef } = useHeaderRef();
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
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
    <section id="party" className="min-h-screen" data-slice-type={slice.slice_type} data-slice-variation={slice.variation}
      style={{
        paddingTop: `${headerHeight}px`,
        marginTop: `-${headerHeight}px`
      }}

    >
      <Bounded>
        <h1 className="text-center font-curly text-8xl lg:text-9xl">Schedule</h1>
        <div className="border-[1px] border-black font-content  w-full">
          <div className="p-10">
            {slice.primary.events.map((item, index) => (
              <div className={clsx("grid grid-cols-1 lg:grid-cols-3 gap-8", index % 2 == 0 ? "opacity-1" : "opacity-0 hidden")} ref={refs[index]} key={index}>
                {/* Image - Stays next to description on large screens */}
                <div className="hidden lg:block">
                  <PrismicNextImage field={item.image} alt="" />
                </div>

                {/* Event Details */}
                <div>
                  <h2 className="text-2xl lg:text-3xl pb-4">{item.event_title}</h2>
                  <PrismicRichText field={item.description} components={{
                    paragraph: ({ children }) => (
                      <p className="text-justify pt-3">{children}</p>),
                    heading2: ({ children }) => (
                      <h2 className="text-balance pt-3 text-left text-xl lg:text-xl">
                        {children}
                      </h2>),
                    em: ({ children }) => (
                      <em className="text-yellow-500 bg-clip-text text-transparent">
                        {children}
                      </em>),
                    strong: ({ children }) => (
                      <strong className="relative text-black after:absolute after:-z-10 after:content-[attr(data-text)] after:left-[0.5px] after:top-[0.5px] after:text-black/50">
                        {children}
                      </strong>)
                  }} />
                  <br />
                  Dresscode:<br />{item.dresscode}
                </div>

                {/* Event Meta (Location, Date, Time) + Image (for small screens) */}
                <div className="flex flex-col-reverse lg:block">
                  {/* Image - Shown below event time on small screens */}
                  <div className="lg:hidden pt-4">
                    <PrismicNextImage field={item.image} alt="" />
                  </div>

                  <div>
                    <h4 className="uppercase">{item.location}</h4>
                    <div className="text-xs">{item.event_day}</div>
                    <div className="text-xs">{item.event_date}</div>
                    <div className="text-xs">{item.event_time}</div>
                    <Button
                      onClick={() => window.open("https://www.google.com/maps/place/" + item.map.latitude + "," + item.map.longitude, "_blank")}
                      className="font-content bg-white border-[1px] border-black lg:border-0 lg:bg-black py-2 px-4 text-sm text-neutral-700 lg:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700"
                    >
                      {submit[context as "en" | "nl" | "pt"]}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="font-content w-full">
          <ul className="flex align-middle items-center w-full">
            {slice.primary.events.map((item, index) => (
              <li key={index} className={clsx("block relative align-middle items-center text-center cursor-pointer", "min-w-[50%]")} onClick={() => setOpen(index + 1)}>
                {open == index + 1 ? <GiPlainCircle className="relative m-auto block -top-[9px] cursor-pointer" /> : <GiCircle className="relative m-auto block -top-[9px] bg-white" />}
                <h3 className="text-2xl">{item.event_title}</h3>
                <div>{item.event_day}</div>
                <div>{item.event_date}</div>
                <div>{item.event_time}</div>
              </li>
            ))}
          </ul>
        </div>
      </Bounded>
    </section>
  );
};

export default Party;
