"use client";
import Bounded from "@/components/Bounded";
import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import TypeDetails from "./TypeDetails";
import { gsap } from 'gsap';

/**
 * Props for `Place`.
 */
export type PlaceProps = SliceComponentProps<Content.PlaceSlice>;

/**
 * Component for "Place" Slices.
 */

type MenuOptions = "eat" | "drink" | "do";

const Place = ({ slice }: PlaceProps): JSX.Element => {

  const [open, setOpen] = useState<MenuOptions>("eat");
  const eatRef = useRef<HTMLDivElement>(null);
  const drinkRef = useRef<HTMLDivElement>(null);
  const doRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } })
    tl.add('start')
    if (open == "eat") {
      tl.fromTo(drinkRef.current, { opacity: 1 }, { opacity: 0, duration: 1, display: "none" }, 'start');
      tl.fromTo(doRef.current, { opacity: 1 }, { opacity: 0, duration: 1, display: "none" }, 'start');
      tl.fromTo(eatRef.current, { opacity: 0 }, { opacity: 1, duration: 1, display: "block" }, "-=0.05");
    } else if (open == "drink") {
      tl.fromTo(eatRef.current, { opacity: 1 }, { opacity: 0, duration: 1, display: "none" }, 'start');
      tl.fromTo(doRef.current, { opacity: 1 }, { opacity: 0, duration: 1, display: "none" }, 'start');
      tl.fromTo(drinkRef.current, { opacity: 0 }, { opacity: 1, duration: 1, display: "block" }, "-=0.05");
    } else if (open == "do") {
      tl.fromTo(eatRef.current, { opacity: 1 }, { opacity: 0, duration: 1, display: "none" }, 'start');
      tl.fromTo(drinkRef.current, { opacity: 1 }, { opacity: 0, duration: 1, display: "none" }, 'start');
      tl.fromTo(doRef.current, { opacity: 0 }, { opacity: 1, duration: 1, display: "block" }, "-=0.05");
    }
  }, [open]);


  return (
    <section id="place"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <Bounded>
        <PrismicNextImage field={slice.primary.main_image} />
        <h1 className="text-center font-curly text-9xl">{slice.primary.title}</h1>
        <hr />
        <div className="font-content text-4xl">
          <span className={clsx("cursor-pointer hover:underline", (open == "eat") && "underline")} onClick={() => setOpen("eat")}>EAT</span> / <span className={clsx("cursor-pointer hover:underline", (open == "drink") && "underline")} onClick={() => setOpen("drink")}>DRINK</span> / <span className={clsx("cursor-pointer hover:underline", (open == "do") && "underline")} onClick={() => setOpen("do")}>DO</span>
        </div>
        {/* {(open == "eat") && (<TypeDetails ref={eatRef} items={slice.primary.places.filter((place) => place.type == "eat")} />)}
        {(open == "drink") && (<TypeDetails ref={drinkRef} items={slice.primary.places.filter((place) => place.type == "drink")} />)}
        {(open == "do") && (<TypeDetails ref={doRef} items={slice.primary.places.filter((place) => place.type == "do")} />)} */}
        <div ref={eatRef} className="opacity-1 w-full">
          <TypeDetails items={slice.primary.places.filter((place) => place.type == "eat")} />
        </div>
        <div ref={drinkRef} className="opacity-0 w-full" >
          <TypeDetails items={slice.primary.places.filter((place) => place.type == "drink")} />
        </div>
        <div ref={doRef} className="opacity-0 w-full">
          <TypeDetails items={slice.primary.places.filter((place) => place.type == "do")} />
        </div>
      </Bounded>
    </section>
  );
};

export default Place;
