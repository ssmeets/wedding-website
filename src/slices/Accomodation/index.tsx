"use client";
import Bounded from "@/components/Bounded";
import { Button } from "@headlessui/react";
import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { moreinfo } from "../Rsvp/translation";
import useHeaderRef from "@/components/useHeaderRef";

/**
 * Props for `Accomodation`.
 */
export type AccomodationProps = SliceComponentProps<Content.AccomodationSlice>;

/**
 * Component for "Accomodation" Slices.
 */
const Accomodation = ({ slice, context }: AccomodationProps): JSX.Element => {
  const [isHovered, setIsHovered] = useState(-1);

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

  return (
    <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation} id="accomodation"
      style={{
        paddingTop: `${headerHeight}px`,
        marginTop: `-${headerHeight}px`
      }}
    >
      <Bounded>
        <h1 className="text-center font-curly text-6xl md:text-8xl">{slice.primary.ttitle}</h1>
        <div className="text-balance leading-7 md:text-2xl font-content text-center">{slice.primary.introduction}</div>
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
          {slice.primary.hotels.map((item, index) => (
            <div key={index}
              className={clsx("flex flex-col items-center justify-center", (index + 1) % 2 === 0 && (index + 1) % 6 != 0 && "md:col-span-2")} onMouseEnter={() => setIsHovered(index)} onMouseLeave={() => setIsHovered(-1)}
              style={{ minHeight: "30rem" }}>
              {isHovered === index ? (
                <div className="relative w-full bg-white border-[1px] border-black p-2"
                  style={{ minHeight: "30rem" }}>
                  <div className="w-full p-2 font-content">
                    <h2 className="uppercase text-l">{item.name}</h2>
                    <PrismicRichText
                      field={item.information}
                      components={{
                        heading3: ({ text }) => <h3 className="uppercase pt-2 font-bold text-black">{text}</h3>,
                        paragraph: ({ text }) => <p className="text-sm pt-3">{text}</p>,
                      }}
                    />
                    <br />
                    <Button
                      onClick={() => item.website && window.open(item.website, "_blank")}
                      className="font-content bg-white border-[1px] border-black md:border-0 md:bg-black py-2 px-4 text-sm text-neutral-700 md:text-white uppercase data-[hover]:bg-gray-600 data-[active]:bg-gray-700"
                    >
                      {moreinfo[context as "en" | "nl" | "pt"]}
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="relative w-full min-h-96"
                  style={{
                    backgroundImage: `url('${item.image?.url || ""}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="absolute bottom-0 bg-black bg-opacity-65 w-full pb-10 pt-10 p-2 text-white uppercase font-content">{item.name}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Bounded>
    </section>
  );
};

export default Accomodation;
