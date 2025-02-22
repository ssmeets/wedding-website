"use client";
import Bounded from "@/components/Bounded";
import useHeaderRef from "@/components/useHeaderRef";
import { Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { useEffect, useState } from "react";

/**
 * Props for `Bio`.
 */
export type BioProps = SliceComponentProps<Content.BioSlice>;

/**
 * Component for "Bio" Slices.
 */
const Bio = ({ slice }: BioProps): JSX.Element => {
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
    <section id="bio"
      className="bg-white min-h-screen"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      style={{
        paddingTop: `${headerHeight}px`,
        marginTop: `-${headerHeight}px`
      }}
    >
      <Bounded>
        <div className="text-left first-letter:uppercase first-letter:text-6xl text-balance leading-7 md:text-2xl md:first-letter:text-9xl md:leading-9 font-content  ">
          <PrismicRichText field={slice.primary.text} />
        </div>
      </Bounded>
    </section>
  );
};

export default Bio;
