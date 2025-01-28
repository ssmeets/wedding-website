"use client";
import React, { useState } from "react";
import { Simplify, TravelSliceDefaultPrimaryTypeItem } from "../../../prismicio-types";
import { BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill, BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import { Button } from "@headlessui/react";
import clsx from "clsx";

export type Locales = {
  en: string;
  nl: string;
  pt: string;
};

const moreinfo: Locales = {
  en: "More Info",
  nl: "Meer informatie",
  pt: "Mais informações",
};

export default function Carousel({ ref, items, context }: { ref?: React.Ref<HTMLDivElement>; items: Simplify<TravelSliceDefaultPrimaryTypeItem>[]; context: string }) {
  const [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(items.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === items.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="overflow-hidden relative">
      <div className={`flex transition ease-out duration-40`} style={{ transform: `translateX(-${current * 100}%)` }}>
        {items.map((item) => {
          return (
            <>
              <div className="block min-w-full max-w-full">
                <div className="flex flex-col">
                  <div className="block">
                    {/* <div style={{ backgroundImage: `url(${item.logo.url})` }} className="block"> */}
                    {/* <div className={clsx("bg-[url('" + item.logo.url! + "')]")}> */}
                    <div className="absolute -top-[20%] h-full w-full justify-between items-center flex text-white px-10 text-3xl">
                      <button onClick={previousSlide}>
                        <BsArrowLeftSquareFill />
                      </button>
                      <button onClick={nextSlide}>
                        <BsArrowRightSquareFill />
                      </button>
                    </div>
                    {/* <img src={item.logo.url!}></img> */}
                    <PrismicNextImage field={item.logo} />
                  </div>
                  <div className="relative bg-white p-4 mb-10 md:mb-20 items-center text-center font-content h-fit ">
                    <h3 className="text-xl md:text-3xl">{item.title}</h3>
                    <span className="text-sm md:text-base">
                      <PrismicRichText field={item.description} />
                    </span>
                    <Button
                      onClick={() => item.link && window.open(item.link, "_blank")}
                      className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-neutral-700 md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700"
                    >
                      {moreinfo[context as "en" | "nl" | "pt"]}
                    </Button>
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full bg-white">
        {items.map((s, i) => {
          return (
            <div
              onClick={() => {
                setCurrent(i);
              }}
              key={"circle" + i}
              className={`w-5 h-5 cursor-pointer  ${i == current ? "bg-white border-[1px] border-black" : "bg-gray-900"}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
